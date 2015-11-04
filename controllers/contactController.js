var hbs = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

var transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "sivakrishnangceb@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "521879207655-daqhmbjkpmpdh9928ng527228pjj900j.apps.googleusercontent.com",
      clientSecret: "LaiT8Yqg9tGpSVOCsV0CWTQv",
      refreshToken: "1/2eRySdx6oxw8TRqfh4U5OvrHhXj_VoxRzdrcXn4gwiFIgOrJDtdun6zK6XiATCKT"
    }
  }
});

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
/*var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'emails/layout',
         defaultLayout : 'template',
         partialsDir : 'emails/partials/'
     },
     viewPath: 'emails',
     extName: '.hbs'
};
transporter.use('compile', hbs(options));*/

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
            
            /*transporter.sendMail({
                from : req.body.email,
                to : 'test@mailinator.com',
                subject : req.body.name + ' : ' + req.body.phone,
                template: 'template',
                 context: {
                      variable1 : 'value1',
                      variable2 : 'value2'
                 }
            }, function(error, response){
                  if(error){
                      res.send(error);
                  }else{
                      res.send("Message sent successfully");
                  }
            });*/
            transporter.sendMail({
                from : req.body.email,
                to : 'test@mailinator.com',
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
                from : 'test@mailinator.com',
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