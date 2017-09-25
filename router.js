const render = require('./render.js');
const weather = require('./weather.js');
const queryString = require('querystring');
const app = require('./app.js');

function homeRoute(request, response) {
  if (request.url === "/") {
    render.view("index", response) }
    }


function cityRoute(request, response) {

  //let page = request.url.replace('/', weather.weatherID);
  let cityQuery = "";
  request.on('data', data => {
   cityQuery += data;
   console.log(cityQuery);
  })

  request.on('end', () => {
      cityQuery = cityQuery.toString();

        if (cityQuery.length > 0 ) {
          weather.GetWeather(cityQuery);
          weather.weatherEmitter.on('end', () => {
            /*if (weather.weatherID > 100) {
            console.log(weather.weatherID);
            render.view('Rain');
            } else {
            render.view('Snow')
            } //end if-else
            */
          switch(true) {
            case (weather.weatherID <= 500):
            console.log(weather.weatherID);
            render.view('Rain');
            break;
            case (weather.weatherID >= 800):
            render.view('Snow');
            break;
            default:
            render.view('Rain');
          } //end switch

          })
        } else {
          console.log('please input a city')
          }
    response.setTimeout(2000, ()=>{
          response.end()
        }) //end timeout
  }) //end requeston on

} //end cityRoute

module.exports.homeRoute = homeRoute;
module.exports.cityRoute = cityRoute;
