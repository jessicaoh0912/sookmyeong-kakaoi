const express = require('express');
const app = express();
const request = require('request');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//오늘, 내일급식 불러옴
const mealRouter = require('./routes/meal');
//오늘학사일정 학사일정 불러옴
const calendarRouter = require('./routes/calendar');
//내일 학사일정 불러옴
const tommorowRouter = require('./routes/calendar1');
 
const weatherRouter = require('./routes/weather');

const lostRouter = require('./routes/lost');



app.use('/meal', mealRouter);
app.use('/calendar', calendarRouter);
app.use('/calendar1', tommorowRouter);
app.use('/weather', weatherRouter);
app.use('/lost', lostRouter);


app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});
