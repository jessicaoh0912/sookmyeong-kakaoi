const request = require('request');
var express = require('express');
var router = express.Router();
const app = express();

let now_date = new Date();
let offset = +9;
var utc = now_date.getTime() + (now_date.getTimezoneOffset() * 60000);
var nd = new Date(utc + (3600000*offset));
var nd2 = new Date(utc + (3600000*offset));
nd2.setMonth(nd2.getMonth()+1,1);//1 : 다음 달로 설정
var monthly_food=[0,0];

function refresh_food()
{
  let now_date = new Date();
  let offset = +9;
  utc = now_date.getTime() + (now_date.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000*offset));
  nd2 = new Date(utc + (3600000*offset));
  nd2.setMonth(nd2.getMonth()+1,1);//1 : 다음 달로 설정
  monthly_food=[0,0];
  request('https://schoolmenukr.ml/api/high/B100000479?year='+nd.getFullYear()+'&month='+(nd.getMonth()+1), (err, res, body) => {
    monthly_food[0] = JSON.parse(body);
  });
  request('https://schoolmenukr.ml/api/high/B100000479?year='+nd2.getFullYear()+'&month='+(nd2.getMonth()+1), (err, res, body) => {
    monthly_food[1] = JSON.parse(body);
  });
  console.log("급식 불러옴")
  setTimeout(refresh_food, 1800000);
}
refresh_food();


router.post('/meal1', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text:"숙명여고 "+ makeText(nd)
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

router.post('/meal2', function(req, res) {
        var temp = new Date(utc + (3600000*offset));      temp.setMonth(nd.getMonth(),nd.getDate()+1);
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text:"숙명여고 "+ makeText(temp)                                                                          
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

function makeText(day){
  console.log(day);
  var aa=
   "[중식]\n\n "+monthly_food[day.getMonth()-nd.getMonth()].menu[day.getDate()-1].lunch;
  aa=aa.replace(/[,]/g,'\n ').replace(/[.]/g,'').replace(/[0-9]/g,'');
  aa=(day.getMonth()+1)+"월 "+(day.getDate())+"일 급식정보\n\n"+aa;                                           return aa;
}


module.exports = router;
