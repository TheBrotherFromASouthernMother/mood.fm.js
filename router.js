const render = require('./render.js');
const weather = require('./weather.js');
const queryString = require('querystring');
const app = require('./app.js');

function homeRoute(request, response) {
  if (request.url === "/") {
    if (request.method === "GET") {
      render.view("index", response)
      response.end();
    } else {
        request.on("data", (postBody) => {
          let query = queryString.parse(postBody.toString());
          response.writeHead(303, {"Location":  "/" + query.city});
          response.end();
     });
   }
  }
}

function cityRoute(request, response) {

  let cityQuery = "";
  let cities = "";
  let query = "";
  request.on('data', data => {
   cityQuery += data;
   console.log(cityQuery);
   cities = request.url.replace('/', '');
   //query = queryString.parse(data.toString());
  // console.log(query);
   //response.writeHead(303, {Location:`/${query.city}`});
  })

  request.on('end', () => {
      cityQuery = cityQuery.toString();
        if (cityQuery.length > 0 ) {
          weather.GetWeather(cityQuery);
          weather.weatherEmitter.on('end', () => {
            switch(true) {
              case (weather.weatherID <= 500):
              console.log(weather.weatherID);
              render.view('Rain');
              response.end();
              break;
              case (weather.weatherID >= 800):
              render.view('Snow');
              response.end();
              break;
              default:
              render.view('Rain');
              response.end();
          } //end switch

        }) //end Weather.on
        } else {
          console.log('please input a city')
          //response.end();
          }
          response.setTimeout(2000, ()=> {
            response.end();
          })

          }) //end requeston on


} //end cityRoute

module.exports.homeRoute = homeRoute;
module.exports.cityRoute = cityRoute;
