const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
//app.use(express.static(__dirname + '/public'));

var currentTemp;
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', (req, res) => {

  res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/weatherToday', (req, res) => {

  console.log(req.body);
  //console.log(req);
  https.get(url, function(res){
    console.log(res.statusCode);
    res.on("data", function(data){
      const weatherdata = JSON.parse(data);
      console.log(weatherdata.weather[0].description);

    })
  })
  res.send("testing");
});

app.post('/', (req, res) => {

   console.log(req.body.city);
   var url = "https://api.openweathermap.org/data/2.5/weather?";
   var location = "q=";
   location = location+req.body.city;
   var appid = "&appid=8c9dbd982e35557d66a38099fed29457";
   var unit = "&unit=metric"
   //q=London,uk&appid=8c9dbd982e35557d66a38099fed29457

   const finalURL = url+location+appid+unit;


    https.get(finalURL, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
       var weatherdata = JSON.parse(data);
       console.log(weatherdata.main.temp);
       const weatherDescription = weatherdata.weather[0].description;
       const icon = weatherdata.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
       res.write("<p>The Weather is currently "+ weatherDescription +"</p>");
       res.write("<h1>The current temprature is "+ weatherdata.main.temp +"</h1>");
       res.write("<img src=" + imageURL + ">");
       res.send();
     })
   })
})


app.listen(8085, function() {
  console.log("server is working");
});
