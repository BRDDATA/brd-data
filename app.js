var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs');



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
	console.log( req.query );
	function inspectFile(contents, file) {
    if (contents.indexOf(req.query.searchString) != -1) {
        // do something
        console.log('I can find in' + file);
       return {
			fileName: file
		};
    }
}
	fs.readdir( __dirname + '/views', function(err, files) {
		console.log(files)
	    files
	         .filter(function(file) { return file.substr(-5) === '.html'; })
	         .forEach(function(file) { 
	         	fs.readFile(file, 'utf-8', function(err, contents) { 	         		
		         	if (contents.indexOf(req.query.searchString) != -1) {
				        // do something
				        console.log('I can find in' + file);
				       data.push({
							fileName: file
						});
				       
				    }
		          }); 

	         	console.log('I am executing', data)
	         	
	    	 });
	    	  
	});

      
})

app.listen(port, function(){
    console.log('Running my app on  PORT: ' + port);
});

module.exports = app;