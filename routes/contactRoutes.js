var express = require('express');


var routes = function(Contact){
    var contactRouter = express.Router();

    var contactController = require('../controllers/contactController')(Contact)
    contactRouter.route('/')
        .post(contactController.post)
        .get(contactController.get);

    contactRouter.use('/:Id', function(req,res,next){
        Contact.findById(req.params.Id, function(err,contact){
            if(err)
                res.status(500).send(err);
            else if(contact)
            {
                req.contact = contact;
                next();
            }
            else
            {
                res.status(404).send('no contact found');
            }
        });
    });
    contactRouter.route('/:Id')
        .get(function(req,res){

            var returnContact = req.contact.toJSON();
            res.json(returnContact);

        })
        .put(function(req,res){
            req.contact.name = req.body.name;
            req.contact.email = req.body.email;
            req.contact.phone = req.body.phone;
            req.contact.message = req.body.message;
            req.contact.read = req.body.read;
            req.contact.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.contact);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.contact[p] = req.body[p];
            }

            req.contact.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.contact);
                }
            });
        })
        .delete(function(req,res){
            req.contact.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return contactRouter;
};

module.exports = routes;