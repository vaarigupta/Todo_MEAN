var express = require('express');
var path = require('path'); //core module present in node.js itself 
var bodyParser = require('body-parser'); 
var app = express();

var index = require('./routes/index'); // home page
var todos = require('./routes/todos'); // todos apis

// View engine - ejs -  uses regular HTML, simple syntax and includes variables and thing like that

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/',todos);

app.listen(3000,function(){
    console.log("server started on port 3000");
})

