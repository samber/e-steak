
var ObjectId = require('mongodb').ObjectID;

var getProduct = function (products, id) {
    for (var i = 0; i < products.length; i++) {
	if (products[i]._id == id)
	    return (products[i]);
    }
}

exports.load = function (db, req, res) {

    db.collection("products").find({}).toArray(function (err, products) {
	if (err) throw err;

	db.collection("purchases").find({}).sort({"timestamp" : -1}).toArray(function (err, purchases) {
	    if (err) throw err;

	    for (var i = 0; i < purchases.length; i++) {
		purchases[i].date = new Date(purchases[i].timestamp * 1000).toString().substr(0, 24);
		purchases[i].product = getProduct(products, purchases[i].product);
	    }

	    res.render("list.html", {
		purchases: purchases
	    });

	});

    });

};
