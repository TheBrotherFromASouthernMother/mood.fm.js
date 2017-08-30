

//imports the http module
const http = require('http');

//hides the api key to prevent security leaks
const key = require('./api.js')

const app = require('./app.js');

const render = require('./render.js');


//Main function
function GetWeather (city = "Houston") {
  
  const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key.apikey}`,(response) => {
  
            let body = "";
            let par = "5";
                    
  
            response.on("data", (data) => {
              body += data;
              
            })
            
            response.on("end", () => { 
               body = body.toString()
               par = JSON.parse(body)
             if (app.city == "") {
              console.log("Please input a city")
             
             } else {
             
             console.log(par.weather[0].id);
               render.view('Rain');
            
               
                    }
              
              })
            

            response.on("error", () => {
                        let message = `Error: $[city] could not be found :(`
                        console.error(message);
                        })
     
     }) //end request
     
   
}

 
module.exports.GetWeather = GetWeather;
