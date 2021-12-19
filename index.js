//brings in the express server and creates the application 
const { application } = require('express');
let express = require('express');
let app = express();

// use the express router object
let router = express.Router();

//create GET to return a list of cities 

router.get('/', function(req, res,next) {
    res.send("New York");
});

//middleware 
//configure the router so all routers are prefixed with /api/v1

app.use('/api', router);

//create server to listen on port 5000

const server = app.listen(5000, function(){
    console.log('Node server running on http://localhost:5000...')
})