"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serve = function (app, ObjectID, MongoClient, connection) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('Client connected');
        socket.on('text-message', function (envelope) { try {
            MongoClient.connect(connection, function (err, db) { if (db != null) {
                db.collection('Messages').insertOne(envelope);
            } });
            io.emit('text-message', envelope);
        }
        catch (e) { } });
        socket.on('disconnect', function () { return console.log('Client disconnected'); });
    });
    app.post('/api/messages/read', function (request, response) {
        try {
            var doc1 = request.body.First;
            var doc2 = request.body.Second;
            MongoClient.connect(connection, function (err, db) {
                if (db != null) {
                    db.collection('Messages').find({ "$and": [{ "$or": [{ "Sender._id": doc1._id }, { "Receiver._id": doc1._id }] }, { "$or": [{ "Sender._id": doc2._id }, { "Receiver._id": doc2._id }] }] }).toArray(function (err, docs) { response.json({ messages: docs }); });
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
    server.listen(app.get('port'), function () { console.log("started on port: " + app.get('port')); });
};
//# sourceMappingURL=Chat.js.map