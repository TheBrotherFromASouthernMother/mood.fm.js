const render = require('./render.js');
const weather = require('./weather.js');
const queryString = require('querystring');
const app = require('./app.js');

function homeRoute(request, response) {
  if (request.url === "/") {
    render.view("index", response);
  }
}


function cityRoute(request, response) {

  //let page = request.url.replace('/', weather.weatherID);
  let cityQuery = "";

  request.on('data', data => {
   cityQuery += data;
   console.log(cityQuery)

  })

  request.on('end', () => {
      cityQuery = cityQuery.toString();

        if (cityQuery.length > 0 ) {
            weather.GetWeather(cityQuery);
            }
         else {
          console.log('please input a city')
        }

       response.setTimeout(7000, ()=>{
         console.log(weather.weatherID);
         if (weather.weatherID < 100) {
        render.view('Rain');
      } else {
        render.view('Snow')
      }
         response.end()
       })
     } ) //end of request.on

} //end cityRoute

module.exports.homeRoute = homeRoute;
module.exports.cityRoute = cityRoute;
