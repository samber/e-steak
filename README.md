e-steak
=======

E-steak service for Epitech Nantes

--------------------------------- FEATURES ---------------------------------
- / : home page to choose the product
- /list : to see all purchases
- /day : to see all purchases of the current day
- You need a PIE account to valid the purchase
- Email confirmation



------------------------------- INSTALLATION -------------------------------
- put in a json file, all products with the next json form (example in data.json) :
      {
	reference:'4242',
	name:'Poney rose',
	weight:'2 tonnes',
	price:'42.00',
	picture:'http://niouzesetweberies.files.wordpress.com/2011/02/petit-poney-rose-1443602d60.png',
      },
      ...
- $> mongoimport --db esteak --collection products --type json --file data.json
- $> node app.js
- edit config.js to send confirmation on each purchase


################## WITH NGINX : ####################
- $> cp esteak.nginx /etc/nginx/sites-enabled/
- $> service nginx restart

}




----------------------------------- TODO -----------------------------------
- A secure form to add/manage/delete products
- If you're not a bad guy and have paypal account, you could develope online payement solution ;-)
- Whatever
