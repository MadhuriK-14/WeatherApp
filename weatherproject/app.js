const express = require('express');
const https = require('https');
const bodyParser=require('body-parser');
const app = express();
app.use (bodyParser.urlencoded({extended:true}));
app.get("/", function (req, res) {
   
  
         res.sendFile(__dirname+"/index.html")
        
});
app.post("/",function(req,res){
   
    const query=req.body.cityName;
    const unit="metric";
    const apiKey="a288e54bca3d8970f0494ab2f932a1aa";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +apiKey+"&units="+unit;

    https.get(url, function (response) {

         console.log(response.statusCode);
         response.on("data", function (data) {
         
            const weatherData=JSON.parse(data);
            const weatherdesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const Imageurl="http://openweathermap.org/img/wn/"+icon+"@4x.png";
            const temp=weatherData.main.temp;
            res.write("<h1>The temperature in "+query+" is "+temp+" degress celcius</h1>");
            res.write("<p> The climatic conditions are "+weatherdesc+" in  "+query+"</p>");
            res.write("<img src="+Imageurl+">");
        });
    });
});
app.listen(3000, function () {
    console.log("server is running on port 3000");
});



