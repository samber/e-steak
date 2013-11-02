
var ObjectId = require('mongodb').ObjectID;

var getProduct = function (products, id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i]._id == id)
            return (products[i]);
    }
}

var getNbrProducts = function (id, purchases) {

    var ret = 0;
    var day = Math.floor(new Date() / 1000 / 60 / 60 / 24);

    for (var i = 0; i < purchases.length; i++) {
	if (Math.floor(purchases[i].timestamp / 60 / 60 / 24) == day && purchases[i].product == id.toString())
	    ret++;
    }
    return (ret);
}

exports.load = function (db, req, res) {

    db.collection("products").find({}).toArray(function (err, products) {
	if (err) throw err;

	db.collection("purchases").find({}).sort({"timestamp" : -1}).toArray(function (err, purchases) {
	    if (err) throw err;

	    var ret1 = new Array();
	    var ret2 = new Array();

	    var day = Math.floor(new Date() / 1000 / 60 / 60 / 24);
	    for (var i = 0; i < purchases.length; i++) {
		if (Math.floor(purchases[i].timestamp / 60 / 60 / 24) == day) {
		    var tmp = purchases[i];
		    tmp.date = new Date(purchases[i].timestamp * 1000).toString().substr(0, 24);
                    tmp.prod = getProduct(products, purchases[i].product);
		    ret2.push(tmp);
		}
	    }

	    for (var i = 0; i < products.length; i++) {
		products[i].nbr = getNbrProducts(products[i]._id, purchases);
		delete products[i]._id;
		delete products[i].picture;
		if (products[i].nbr >= 1) {
		    ret1.push(products[i]);
		}
	    }

	    res.render("day.html", { products : ret1, purchases : ret2 });

	});

    });

};
