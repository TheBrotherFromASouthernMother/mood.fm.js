const fs = require('fs');
const app = require('./app.js');


function view(template, response = app.res) {

  //read from  the template files
 let fileContents = fs.readFileSync(`./${template}.html`, {encoding: "utf8"});
  //write out to the response
    response.write(fileContents);

}

module.exports.view = view;
