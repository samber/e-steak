'use strict';

var ObjectId	= require('mongodb').ObjectID;
var config	= require('./config');
var path	= require('path');
var nodemailer	= require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
	user: config.mailer.auth.user,
	pass: config.mailer.auth.pass
    }
});

var sendNotification = function (db, req) {

    var mailOptions = {
	from: "Samuel BERTHE <contact@samuel-berthe.fr>",
	to: req.body.login + "@epitech.eu",
	//to: "berthe_s@epitech.eu",
	subject: "Commande e-steak",
	text: "Votre commande e-steak a été validée\n\nElle sera disponible à partir de 19h30 au bureau du BDE.\nLe paiement sera demandé au retrait du produit.\n\nBonne piscine !"
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
	if (error)
	    console.log(error);
	else
	    console.log("Message sent: " + response.message);
    });
}

var savePurchase = function (db, req, res) {

    var date = Math.floor(new Date().getTime() / 1000);

    db.collection("purchases").insert({"timestamp" : date, "login" : req.body.login, "product" : req.params.id }, function (err, doc) {
	if (err) throw err;

	if (doc) {
	    res.send("Commande valid&eacute;e - Thank you !<br/><br/>Pour 0.5€ de plus, le BDE vous proposera sur place un choix de canettes pour compléter votre repas<br/><br/><a href='/'>home</a>");
	    sendNotification(db, req);
	}
	else
	    res.send("fail...");
    });

}

var checkAndPush = function(db, req, res) {

    var http = require('http');

    var tmp = escape(req.body.passwd).replace("+", "%2B");
    var options = {
	host: 'ws.paysdu42.fr',
	path: '/JSON/?action=login&auth_login=' + escape(req.body.login) + '&auth_password=' + tmp,
    };

    var callback = function(response) {
	var str = ''
	response.on('data', function (chunk) {
	    str += chunk;
	});
	response.on('end', function () {
	    var json = JSON.parse(str);
	    if (json.error && json.error == "none") {
		savePurchase(db, req, res);
	    }
	    else {
		res.send("bad password");
	    }
	});
    }

    http.request(options, callback).end();
}


exports.load = function (db, req, res) {

    db.collection("products").findOne({"_id" : new ObjectId(req.params.id)}, function (err, doc) {
        if (err) throw err;

	if (doc) {
	    checkAndPush(db, req, res);
	}
	else {
	    res.send("Unknown product");
	}

    });

};
