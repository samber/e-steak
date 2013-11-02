
exports.load = function (db, req, res) {

    db.collection("products").find({}).toArray(function (err, docs) {
	if (err) throw err;

	res.render("homePage.html", {
	    products: docs
	});

    });

};
