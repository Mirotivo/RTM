import { Category } from "../models/Category";

exports.Serve = function(app:any,ObjectID:any,MongoClient:any,connection:any) {
    app.post('/api/categories/read', function(request:any, response:any) {
    try {
        MongoClient.connect(connection, function (err:any, db:any) {
        if (db != null) { db.collection('Categories').find().toArray(function (err:any, docs:Category[]) { response.json({ categories: docs }); }); db.close(); }
        else response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': err.message}));
        });
    }
    catch (e) {
        response.status(400).send(JSON.stringify({'message':"Error occurred.", 'Exception': e}));
    }
    });
}