
var express             = require('express');
var cons                = require('consolidate');
var MongoClient         = require('mongodb').MongoClient;

var config		= require('./config');

var homePage		= require('./homePage');
var checkIdentity	= require('./checkIdentity');
var validPurchase	= require('./validPurchase.js');
var listPurchases	= require('./listPurchases');
var dayListPurchases	= require('./dayListPurchases');

var app                 = express();

MongoClient.connect(config.db.production, function(err, db) {
    "use strict";

    if (err)
        throw err;

    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.use(express.bodyParser());




    app.get("/", function (req, res) {
	homePage.load(db, req, res);
    });
    /* all purchases */
    app.get("/list", function (req, res) {
	listPurchases.load(db, req, res);
    });
    /* actual day purchases */
    app.get("/day", function (req, res) {
	dayListPurchases.load(db, req, res);
    });

    app.post("/buy/:id", function (req, res) {
	checkIdentity.load(db, req, res);
    });

    app.post("/valid/:id", function (req, res) {
	validPurchase.load(db, req, res);
    });




    app.listen(3000);
    console.log('Express server listening on port 3000');

});

process.on('uncaughtException', function(err) {
    // to handle the fucking uncaught errors !
    console.log(err);
});