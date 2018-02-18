import { User } from "../models/User";
var passwordHash = require('password-hash');

exports.Serve = function(app:any,ObjectID:any,MongoClient:any,connection:any) {
    app.post('/api/users/create', function(request:any, response:any) {
    try {
        var doc : User = request.body.user;
        doc.Password = passwordHash.generate(doc.Password);
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) {
            db.collection('Users').findOne({ "Email" : doc.Email }, function(err:any, document:User) { 
                if (document == null) {
                    db.collection('Users').insertOne(doc);
                    db.collection('Users').find().limit(1).sort({$natural:-1}).toArray(function (err:any, documents:User[]) {
                        if(documents == null) response.status(200).send(JSON.stringify({'user':null}));
                        else response.status(200).send(JSON.stringify({'user': documents[0]}));
                        db.close();
                    })
                }
                else response.status(200).send(JSON.stringify({'user':null}));
                db.close(); 
             } );
            
        }
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
    app.post('/api/users/read', function(request:any, response:any) {
    try {
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) { db.collection('Users').find().toArray(function (err:any, docs:User[]) { response.json({ users: docs }); }); db.close(); }
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
    app.post('/api/users/findbyid', function(request:any, response:any) {
    try {
        var doc : User = request.body.user;
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) { db.collection('Users').findOne({ "_id" : new ObjectID(doc._id) }, function(err:any, document:User) {
                if(document == null)response.status(200).send(JSON.stringify({'user':null}));
                else response.status(200).send(JSON.stringify({'user': document}));
                db.close(); 
             } );}
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
    app.post('/api/users/login', function(request:any, response:any) {
    try {
        var doc: User = request.body.user;
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) {
            db.collection('Users').findOne({ "Email" : doc.Email }, function(err:any, document:User) { 
                if (document != null && passwordHash.verify(doc.Password, document.Password)) response.status(200).send(JSON.stringify({'user': document}));
                else response.status(200).send(JSON.stringify({'user':null}));
                db.close(); 
             } );}
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
    app.post('/api/users/update', function(request:any, response:any) {
    try {
        var doc : User = request.body.user;
        MongoClient.connect(connection, function (err:any, db:any) {
            if (db != null) { db.collection('Users').updateOne( { "_id" : new ObjectID(doc._id) }, { FirstName: doc.FirstName, LastName: doc.LastName, Address: doc.Address, City: doc.City, State: doc.State, Zip:doc.Zip, Title: doc.Title, Company:doc.Company, PhoneNumber: doc.PhoneNumber, Email: doc.Email, Password:doc.Password, Website: doc.Website, Role: doc.Role }); db.close(); response.status(200).send(JSON.stringify({'message': "Updated Successfully"})); }
            else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
    app.post('/api/users/delete', function(request:any, response:any) {
    try {
        var docId = request.body.userid;
        MongoClient.connect(connection, function (err:any, db:any) {
            if (db != null) { db.collection('Users').deleteOne( { "_id" : new ObjectID(docId) } ); db.close(); response.status(200).send(JSON.stringify({'message': "Deleted Successfully"})); }
            else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
}