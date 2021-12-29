//brings in the express server and creates the application 
const { application } = require('express');
let express = require('express');
const { search } = require('./repos/citiesRepo');
let app = express();
let citiesRepo = require('./repos/citiesRepo');

// use the express router object
let router = express.Router();


//create GET to return a list of cities 

router.get('/', function(req, res, next) {
    citiesRepo.get(function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cities retrieved",
            "data": data
        })
    }, function(err){
        next(err);
    });
});

//create a GET search for cities by id or name
// search?id=n&name=str

router.get('/search', function(req, res, next) {
    let searchObject = {
        "id": req.query,
        "name": req.query.name
    };
    citiesRepo.search(searchObject, function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Search results retrieved",
            "data": data
        });
    }, function(error) {
        next(error);
    }); 
});

//create the router that uses an id calling the getById function
//

router.get('/:id', function(req,res, next){
    citiesRepo.getById(req.params.id, function(data){
        if(data) {
            res.status(200).json({
                "status":200,
                "statusText": "OK",
                "message": "City Retrieved",
                "data": data
            })
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The ciy with id " + req.params.id + " could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The ciy with id " + req.params.id + " could not be found."
                }
            });
        }
    })
});


//middleware 
//configure the router so all routers are prefixed with /api/v1

app.use('/api', router);

//create server to listen on port 5000

const server = app.listen(5000, function(){
    console.log('Node server running on http://localhost:5000...')
})