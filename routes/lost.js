const request = require('request');
var express = require('express');
var router = express.Router();
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');



var week_lost=[0,0];  
var array = ["https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800","https://mblogthumb-phinf.pstatic.net/MjAyMTAzMTdfMTQ0/MDAxNjE1OTkwNzg4MTI1.ec39eF-h6pYrOhg87iKwdOJxn4XDZYsiD4d_o7JGqjcg.z5FawAn-5yl1ObuLS_MEoIEr-VDLogq4c3jtOalJTR8g.PNG.ondojung/%EB%AC%B4%EC%A0%9C9%EF%BC%BF20210317231858.png?type=w800"] 
  var array2 = ['아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.']
  var array3 = ['아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.','아직 등록되지 않았습니다.']
  
router.post('/lost', function (req, res) {
console.log(req.body)
	
var params2  = req.body['action']['params']['where']; 
var detail  = req.body['action']['params']['분실물 상세정보']; 
var image = req.body['action']['params']['secureimage'];
	
    array.unshift(image) 
	array2.unshift(params2)
	   array3.unshift(detail) 
	
    console.log(array)
    console.log(array2)
    console.log(array3) 
	
 const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "정상적으로 등록되었습니다. 분실물 찾기로 확인해보세요"
         }
        }
      ],     "quickReplies": [    
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

router.post('/find', function(req, res) {
  const responseBody = {
  "version": "2.0",
  "template": {
    "outputs": [
      {
        "carousel": {
          "type": "basicCard",
          "items": [
            {
              "title": "주운장소: "+array2[0],
              "description": array3[0],
              "thumbnail": {
                "imageUrl": array[0],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }              
            },
            {
              "title": "주운장소: "+array2[1],
              "description": array3[1],
              "thumbnail": {
                "imageUrl": array[1],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }             
            },
            {
              "title": "주운장소: "+array2[2],
              "description": array3[2],
              "thumbnail": {
                "imageUrl": array[2],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[3],
              "description": array3[3],
              "thumbnail": {
                "imageUrl": array[3],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            				 
            },
			  {
              "title": "주운장소: "+array2[4],
              "description": array3[4],
              "thumbnail": {
                "imageUrl": array[4],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[5],
              "description": array3[5],
              "thumbnail": {
                "imageUrl":array[5],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[6],
              "description": array3[6],
              "thumbnail": {
                "imageUrl": array[6],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[7],
              "description": array3[7],
              "thumbnail": {
                "imageUrl": array[7],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[8],
              "description": array3[8],
              "thumbnail": {
                "imageUrl": array[8],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }            
            },
			  {
              "title": "주운장소: "+array2[9],
              "description": array3[9],
              "thumbnail": {
                "imageUrl": array[9],
				  fixedRatio : true, 
				  width : 500,
				  height : 500
              }           
            }
          ]
        }
      }
    ],     "quickReplies": [    
      {
        "action": "block",
        "messageText": "↩",
        "blockId": "60482f7da8cb07012a49abfa",
        "label": "↩"
		  }
		]
  }
}
    

  res.status(200).send(responseBody);
});

module.exports = router;
