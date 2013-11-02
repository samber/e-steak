
var ObjectId = require('mongodb').ObjectID;

exports.load = function (db, req, res) {

    db.collection("products").findOne({"_id" : new ObjectId(req.params.id)}, function (err, doc) {
        if (err) throw err;

	if (doc) {
            res.render("checkIdentity.html", {
		product: doc
            });
	}
	else {
	    res.send("Bad password (ppp).");
	}

    });

};