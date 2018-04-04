const express = require('express');
const app = express();

const weatherRequest = require('./weather.js')

const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", "./views")

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
  res.render('index',{
    greeting: 'Welcome to Mood.fm',
    instructions: 'Enter your city below',
    weatherData: ""
  } )
  return next();
})

count = 0

app.post("/:city", (req, res, next) => {
  let cityQuery = req.params.city.toString().slice(1);
  weatherRequest.GetWeather(cityQuery);
  weatherRequest.weatherEmitter.on('end', () => {
    res.render("rain")
    console.log("Headers sent?2 ", res.headersSent);
    console.log(count)
    count ++;
  })
})

app.listen(3000, function(){
    console.log('Example app listening on port ');
});
