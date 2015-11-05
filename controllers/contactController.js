

//var nodemailer = require('nodemailer');
//var hbs = require('nodemailer-express-handlebars');
var adminEmail = "dan@brddata.com";
var ccEmail = "bharath@brddata.com";
var testEmail ="brddatatest@gmail.com";
var ccTestEmail ="sivakrishnangceb@gmail.com";
//var transporter = nodemailer.createTransport();

var path           = require('path')
  , templatesDir   = path.join(__dirname, 'templates')
  , emailTemplates = require('email-templates')
  ,nodemailer = require('nodemailer');


/*var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'emails/layout',
         defaultLayout : 'template',
         partialsDir : 'emails/partials/'
     },
     viewPath: 'emails/layout',
     extName: '.hbs'
};*/

var transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "brddatatest@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "904735654699-je466p4rmr6hjuvs5e1kghltdococnbn.apps.googleusercontent.com",
      clientSecret: "3sSIPkAhyxdHa7sGDEtys8TJ",
      refreshToken: "1/eBiFNZHbOInfdHkEm62NpW3x5wR0uFJpr64tjAuzNTBIgOrJDtdun6zK6XiATCKT"
    }
  }
});
/*transporter.use('compile', hbs(options));
transporter.sendMail({
    to : ccTestEmail,
    subject : 'testing',
}, function(error, response){
      if(error){
          res.send(error);
      }else{
          res.send("Message sent successfully");
      }
});*/



/*var mailOptions = {
  from: "sivakrishnangceb@gmail.com",
  to: "sivakrishnan@live.com",
  subject: "Hello",
  generateTextFromHTML: true,
  html: "<b>Hello world</b>"
};*/

/*transporter.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
  transporter.close();
});*/

var contactController = function(Contact){

    var post = function(req, res){
        var contact = new Contact(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            contact.save();
            res.status(201);
            //res.send(contact);
            transporter.sendMail({
                to : testEmail,
                cc : ccTestEmail,
                subject : req.body.name + ' : ' + req.body.phone,
                text : req.body.message
            }, function(error, response){
                  if(error){
                      //res.send(error);
                  }else{
                      //res.send("Message sent successfully");
                  }
            });
            transporter.sendMail({
                to : req.body.email,
                subject : 'Thanks for your message',
                text : 'We have received your message and working on it.'
            }, function(error, response){
                  if(error){
                      res.send(error);
                  }else{
                      res.send("Message sent successfully");
                  }
            });
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.email)
        {
            query.email = req.query.email;
        }
        Contact.find(query, function(err,contacts){

            if(err)
                res.status(500).send(err);
            else {

                var returnContacts = [];
                contacts.forEach(function(element, index, array){
                    var newContact = element.toJSON();
                    returnContacts.push(newContact);
                });
                res.json(returnContacts);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = contactController;