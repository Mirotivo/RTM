"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serve = function (app, ObjectID, MongoClient, connection) {
    app.post('/api/categories/read', function (request, response) {
        try {
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Categories').find().toArray(function (err, docs) { response.json({ categories: docs }); });
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
//# sourceMappingURL=Menu.js.map