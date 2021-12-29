// Fs is a built in node module for handling files 
let fs = require('fs');
const { resolve } = require('path');
const FILE_NAME = './assets/cities.json';

let citiesRepo = {
    function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }

        });
    },


    //a function created for searching for an object by id 
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if(err) {
                reject(err);
            } else {
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city);
            }
        });
    },
    //a function used to search for specfic values depending on data set 
    search: function(searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if(err) {
                reject(err);
            } else {
                let cities = JSON.parse(data);

                //perform a search 
                if (searchObject) {
                    cities = cities.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) &&
                        (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));                   
                }

                resolve(cities);
            }
        })
    },
    //post route to add new data to file
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if(err) {
                reject(err);
            } else {
                let cities = JSON.parse(data);
                cities.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(cities), function(err) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(newData);
                    }
                })
            }
        })
    }
};



module.exports = citiesRepo;