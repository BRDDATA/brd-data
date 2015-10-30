var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

db= mongoose.connect('mongodb://localhost/brd-data');


var Contact = require('./models/contactModel');

var app = express();

var port = 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

contactRouter = require('./routes/contactRoutes')(Contact);

app.use('/', express.static(__dirname + '/'));

app.use('/api/contacts', contactRouter); 

app.listen(port, function(){
    console.log('Running my app on  PORT: ' + port);
});

module.exports = app;