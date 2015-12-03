var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    striptags = require('striptags');



var db;

db= mongoose.connect('mongodb://localhost/brd-data');


var Contact = require('./models/contactModel');

var app = express();

var port = 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

contactRouter = require('./routes/contactRoutes')(Contact);

app.use('/', express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/'));
app.use('/api/contacts', contactRouter); 

app.use('/search', function(req, res){
	var data = [];
	
	fs.readdir( __dirname + '/views', function(err, files) {		
	    files.forEach(function(file, idx) { 
         	fs.readFile(__dirname + '/views/' +file, 'utf-8', function(err, contents) {
         		
         		if(contents){
         			var start = contents.indexOf('<!--STARTSEARCH-->'),
	         		    end = contents.indexOf('<!--ENDSEARCH-->'),
	         		    searchIndex;
	         			contents = contents.substring(start-18,end);
	         			contents = striptags(contents);
		         		searchIndex = contents.indexOf(req.query.searchString);

			         	if (searchIndex != -1) {					         		 		        
					        data.push({
								fileName: file,
								fileContent: contents.substr(searchIndex,500)
							});				       
					    }
					    if(files.length-1 == idx) {
					    	res.status(200).json(data);
					    }
         		}
         	
	        }); 
    	 });	    	  
	});

      
})

app.listen(port, function(){
    console.log('Running my app on  PORT: ' + port);
});

module.exports = app;