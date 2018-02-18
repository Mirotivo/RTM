"use strict";
var express = require('express'), bodyParser = require('body-parser');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var local = 'mongodb://localhost:27017/DNB';
var remote = process.env.remote;
var connection = remote;
var ServiceUser = require('./services/User.js');
var ServiceActivity = require('./services/Activity.js');
var ServiceChat = require('./services/Chat.js');
var ServiceMap = require('./services/Map.js');
var ServiceReport = require('./services/Report.js');
var Menu = require('./services/Menu.js');
// views is directory for all template files
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
// SPA application
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) { response.render('index.html'); });
app.get('*', function (request, response) { response.render('index.html'); });
ServiceUser.Serve(app, ObjectID, MongoClient, connection);
ServiceActivity.Serve(app, ObjectID, MongoClient, connection);
ServiceChat.Serve(app, ObjectID, MongoClient, connection);
ServiceMap.Serve(app, ObjectID, MongoClient, connection);
ServiceReport.Serve(app, ObjectID, MongoClient, connection);
Menu.Serve(app, ObjectID, MongoClient, connection);
//# sourceMappingURL=main.js.map