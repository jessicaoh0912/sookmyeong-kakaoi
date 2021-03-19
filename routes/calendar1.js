const request = require('request');
var express = require('express');
var router = express.Router();
const app = express();
const moment = require('moment');
const today = moment();


function refresh_food()
{
  const today = moment();
  const nextday = today.add(1, 'days');
  var dateformat =  nextday.format('YYYYMMDD');
 
  monthly_food=[0,0];
  request('https://open.neis.go.kr/hub/SchoolSchedule?KEY=b14f10f6a4024b34b57531b5c8117a7e&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010201&AA_YMD='+dateformat, (err, res, body) => {
    monthly_food[0] = JSON.parse(body);
  });
  
  console.log(dateformat)
  console.log("학사일정 불러옴")
  setTimeout(refresh_food, 1800000);
}
refresh_food();


router.post('/calendar1', function(req, res) {
	var day = new Date()
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text:"숙명여고 "+  makeText()
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
var day = new Date() 
	try{
  var aa = monthly_food[0]['SchoolSchedule'][1]['row'][0]['EVENT_NM'] ;
}catch(e){var aa = "내일은 일정이 없습니다."}
	try{
  var bb = '\n'+monthly_food[0]['SchoolSchedule'][1]['row'][1]['EVENT_NM'];
}catch(e){var bb = ""}
	try{
  var cc = '\n'+monthly_food[0]['SchoolSchedule'][1]['row'][2]['EVENT_NM'];
}catch(e){var cc = ""}
try{
  var dd = '\n'+monthly_food[0]['SchoolSchedule'][1]['row'][3]['EVENT_NM'];
}catch(e){var dd = ""}
	
	
	var text = aa+bb+cc+dd
	  text=(day.getMonth()+1)+"월 "+(day.getDate()+1)+"일 학사일정\n\n"+text;      
  return text;
}


module.exports = router;
