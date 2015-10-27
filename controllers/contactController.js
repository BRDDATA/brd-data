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
            res.send(contact);
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