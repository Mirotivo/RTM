import { User } from "../models/User";
import { Envelope } from "../models/Envelope";

exports.Serve = function(app:any,ObjectID:any,MongoClient:any,connection:any) {
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    io.on('connection', (socket:any) => {
        console.log('Client connected');
        socket.on('text-message', (envelope: Envelope) => { try { MongoClient.connect(connection, function (err:any, db:any) { if (db != null) { db.collection('Messages').insertOne(envelope); } }); io.emit('text-message', envelope);  } catch (e) { } });
        socket.on('disconnect', () => console.log('Client disconnected'));
    });
    
    app.post('/api/messages/read', function(request:any, response:any) {
    try {
        var doc1: User = request.body.First;
        var doc2: User = request.body.Second;
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) { db.collection('Messages').find({ "$and": [{"$or": [{ "Sender._id" : doc1._id }, { "Receiver._id" : doc1._id }]},{"$or": [{ "Sender._id" : doc2._id }, { "Receiver._id" : doc2._id }]}] }).toArray(function (err:any, docs:Envelope[]) { response.json({ messages: docs }); }); db.close(); }
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });


    server.listen( app.get('port'), () => { console.log(`started on port: ` + app.get('port') ); });    
}