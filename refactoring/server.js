const express = require('express');
const app = express();

const weatherRequest = require('./weather.js')

const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", "./views")

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
  res.render('index',{
    greeting: 'Mood.fm',
  } )
  return next();
})

count = 0

app.post("/:city", (req, res, next) => {
  let cityQuery = req.params.city.toString().slice(1);
  weatherRequest.GetWeather(cityQuery);
  weatherRequest.weatherEmitter.on('end', () => {
    if (weatherRequest.weatherID >= 300 && weatherRequest.weatherID < 600){
        res.render("rain")
    } else if (weatherRequest.weatherID >= 600 && weatherRequest.weatherID < 700) {
      res.render("snow")
    } else if (weatherRequest.weatherID >= 800 && weatherRequest.weatherID < 957) {
      res.render('chillin')
    } else if (weatherRequest.weatherID >= 200 && weatherRequest.weatherID < 300 || weatherRequest.weatherID >= 957) {
      res.render('notChill.ejs')
    } else {
      res.render("chillin")
    }


    console.log("Headers sent?2 ", res.headersSent);
    console.log(count)
    count ++;
  })
})

app.listen(3000, function(){
    console.log('Example app listening on port ');
});
