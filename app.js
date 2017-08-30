//imports modules
const http = require('http');
const weather = require('./weather.js');
const render = require('./render.js')

let city = "";

const hostname = '127.0.0.1';
const port = 3000;

//creates an http serve object
const server = http.createServer((request, response) => {
    const res = response;
  
  render.view("index", response);
  
  module.exports.res = res;
  let body = "";
  request.on('data', data => {
   body += data;
  })
  
  request.on('end', () => {
      body = body.toString();
       city = body;
       
       module.exports.city = city;
       weather.GetWeather(city);
             } )

    
  
 });

//Let's us know that the serve is actually running when we execute the program on the commandline
server.listen(port, () => {
  console.log(`Server running at http://<workspace-url>/`);
});
