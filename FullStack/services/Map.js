"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serve = function (app, ObjectID, MongoClient, connection, passwordHash) {
    app.post('/api/locations/create', function (request, response) {
        try {
            var doc = request.body.location;
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Locations').findOne({ "$and": [{ "Latitude": doc.Latitude }, { "Longitude": doc.Longitude }] }, function (err, document) {
                        if (document == null) {
                            db.collection('Locations').insertOne(doc);
                            db.collection('Locations').find().limit(1).sort({ $natural: -1 }).toArray(function (err, documents) {
                                if (documents == null)
                                    response.status(200).send(JSON.stringify({ 'message': "Error occurred." }));
                                else
                                    response.status(200).send(JSON.stringify({ 'message': "Added Successfully" }));
                                db.close();
                            });
                        }
                        else
                            response.status(200).send(JSON.stringify({ 'message': "Already Added." }));
                        db.close();
                    });
                }
                else
                    response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': err.message }));
            });
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
    app.post('/api/locations/read', function (request, response) {
        try {
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Locations').find().toArray(function (err, docs) { response.json({ locations: docs }); });
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
};
//# sourceMappingURL=Map.js.map