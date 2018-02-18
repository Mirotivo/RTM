"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serve = function (app, ObjectID, MongoClient, connection) {
    app.post('/api/activities/create', function (request, response) {
        try {
            var doc = request.body.activity;
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Activities').insertOne(doc);
                    db.close();
                    response.status(200).send(JSON.stringify({ 'message': "Added Successfully" }));
                }
                else
                    response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': err.message }));
            });
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
    app.post('/api/activities/read', function (request, response) {
        try {
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Activities').find().toArray(function (err, docs) { response.json({ activities: docs }); });
                    db.close();
                }
                else
                    response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': err.message }));
            });
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
    app.post('/api/activities/update', function (request, response) {
        try {
            // var doc = request.body.activity;
            // MongoClient.connect(connection, function (err, db) {
            //     if (db != null) { db.collection('Activities').updateOne( { "_id" : new ObjectID(doc._id) }, { FirstName: doc.FirstName, LastName: doc.LastName, Address: doc.Address, City: doc.City, State: doc.State, Zip:doc.Zip, Title: doc.Title, Company:doc.Company, PhoneNumber: doc.PhoneNumber, Email: doc.Email, Website: doc.Website }); db.close(); response.status(200).send(JSON.stringify({'message': "Updated Successfully"})); }
            //     else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
            // });
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
    app.post('/api/activities/delete', function (request, response) {
        try {
            var docId = request.body.activityid;
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Activities').deleteOne({ "_id": new ObjectID(docId) });
                    db.close();
                    response.status(200).send(JSON.stringify({ 'message': "Deleted Successfully" }));
                }
                else
                    response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': err.message }));
            });
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
};
//# sourceMappingURL=Activity.js.map