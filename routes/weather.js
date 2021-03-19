const request = require('request');
var express = require('express');
var router = express.Router();
const app = express();

var monthly_food=[0,0];

function refresh_weather()
{ 
  monthly_food=[0,0];
  request('http://api.openweathermap.org/data/2.5/weather?q=SEOUL&appid=3297f34dc15a92481434262618618415', (err, res, body) => {
    monthly_food[0] = JSON.parse(body); 
 });
  console.log("날씨정보 불러옴")
  setTimeout(refresh_weather, 1800000);
}
refresh_weather();
 


router.post('/weather', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: makeText()
          }
        }
      ],
       "quickReplies": [    
      {
        "action": "block",
        "messageText": "↩",
        "blockId": "60482f7da8cb07012a49abfa",
        "label": "↩"
		  }
		]
    }
  };  
  
  res.status(200).send(responseBody);
});





function makeText(){
 var day = new Date();
 var main = monthly_food[0]['weather'][0]['main']
 main = main.replace("Mist","안개💨").replace('Clear','맑음☀').replace('Snow','눈').replace('Few clouds','약간의 구름🌫').replace('Scattered clouds','흩어진 구름🌫').replace('broken clouds','구름 많음🌫').replace('Shower rain','소나기🌧').replace('Rain','비🌧').replace('Thunderstorm','천둥번개⛈').replace("Clear",'맑음')
	 var temp = monthly_food[0]['main']['temp'] ;
  temp=Math.floor(temp-273)
   var humidity = monthly_food[0]['main']['humidity'] ;
	humidity=JSON.stringify(humidity)
  var feel= monthly_food[0]['main']['feels_like'] ; feel = Math.floor(feel-273)
  var temp_min =monthly_food[0]['main']['temp_min'];
	temp_min = Math.floor(temp_min-273)
  var temp_max=monthly_food[0]['main']['temp_max']
  temp_max=Math.floor(temp_max-273)

	var text = '🌈날씨: '+main+'\n\n📍현재온도: '+temp+'도\n📍현재습도: '+humidity+'\n📍체감온도: '+feel+'도\n📍최저온도: '+temp_min+'도\n📍최고온도: '+temp_max+'도'
	  text=(day.getMonth()+1)+"월 "+(day.getDate()+1)+"일 "+(day.getHours())+"시 "+ (day.getMinutes())+"분 "+ "강남구 날씨🔆 \n\n"+text;      
  return text;
}

module.exports = router;
