const EventEmitter = require("events").EventEmitter;
//imports the http module
const http = require('http');

//hides the api key to prevent security leaks
const key = require('./api.js')

const app = require('./app.js');

const render = require('./render.js');

const util = require("util");


let weatherID = "10";



//Main function
function GetWeather (city = "Houston") {

  let weatherEmitter = new EventEmitter;
  module.exports.weatherEmitter = weatherEmitter;
  const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key.apikey}`,(response) => {
            let body = "";
            let parsedData = null;

            response.on("data", (data) => {
              body += data;
              weatherEmitter.emit("data", data);
            })

            response.on("error", () => {
                        let message = `Error: $[city] could not be found :(`
                        console.error(message);
                        weather.emit('error', error);
                        })

            response.on("end", () => {
               body = body.toString()
               par = JSON.parse(body)
               weatherID = par.weather[0].id;
               module.exports.weatherID = weatherID;
               weatherEmitter.emit('end');

              })
     }) //end request

}; //end function GetWeather


module.exports.GetWeather = GetWeather;
