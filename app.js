//imports modules
const http = require('http');
const weather = require('./weather.js');
const render = require('./render.js');
const router = require('./router.js');



const hostname = '127.0.0.1';
const port = 3000;

//creates an http serve object
const server = http.createServer((request, response) => {
    const res = response;
    const {method, url, headers} = request;
    module.exports.res = res;
    router.homeRoute(request, response);
    request.on('data', () => {
    /*  console.log(method);
      console.log(url);
      console.log(headers);
      */
    });
    router.cityRoute(request, response)

 });

//Let's us know that the serve is actually running when we execute the program on the commandline
server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
