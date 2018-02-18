import { Location } from "../models/Location";

exports.Serve = function(app:any,ObjectID:any,MongoClient:any,connection:any,passwordHash:any) {
    app.post('/api/locations/create', function(request:any, response:any) {
    try {
        var doc : Location = request.body.location;
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) {
            db.collection('Locations').findOne({ "$and":[ { "Latitude":doc.Latitude }, { "Longitude":doc.Longitude }] }, function(err:any, document:Location) { 
                if (document == null) {
                    db.collection('Locations').insertOne(doc);
                    db.collection('Locations').find().limit(1).sort({$natural:-1}).toArray(function (err:any, documents:Location[]) {
                        if(documents == null) response.status(200).send(JSON.stringify({'message': "Error occurred."}));
                        else response.status(200).send(JSON.stringify({'message': "Added Successfully"}));
                        db.close();
                    })
                }
                else response.status(200).send(JSON.stringify({'message': "Already Added."}));
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
    app.post('/api/locations/read', function(request:any, response:any) {
    try {
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) { db.collection('Locations').find().toArray(function (err:any, docs:Location[]) { response.json({ locations: docs }); }); db.close(); }
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
}