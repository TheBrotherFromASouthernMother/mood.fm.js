const EventEmitter = require("events");
//imports the http module
const http = require('http');

//hides the api key to prevent security leaks
const key = require('./api.js')

const app = require('./app.js');

const render = require('./render.js');

let weatherID = "10";
const weatherEmitter = new EventEmitter.EventEmitter();
//Main function
function GetWeather (city = "Houston") {



  const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key.apikey}`,(response) => {
            let body = "";
            let par = "";

            response.on("data", (data) => {
              body += data;
              weatherEmitter.emit("data", data);
            })

            response.on("error", () => {
                        let message = `Error: $[city] could not be found :(`
                        console.error(message);
                        })

            response.on("end", () => {
               body = body.toString()
               par = JSON.parse(body)
               weatherID = par.weather[0].id;
              weatherEmitter.emit('end');
              console.log(weatherID);

              module.exports.weatherID = weatherID;
              })
     }) //end request

}; //end function GetWeather
module.exports.weatherEmitter = weatherEmitter;
module.exports.GetWeather = GetWeather;
