// Fs is a built in node module for handling files 
let fs = require('fs');
const { resolve } = require('path');
const FILE_NAME = './assets/cities.json';

let citiesRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }

        })
    },
    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data) {
            if(err) {
                reject(err);
            } else {
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city);
            }
        })
    }
};

module.exports = citiesRepo;