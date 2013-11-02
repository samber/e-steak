'use strict';

module.exports = {
    db: {
	production: "mongodb://127.0.0.1:27017/esteak",
    },
    mailer: {
	auth: {
	    user: 'contact@samuel-berthe.fr',
	    pass: '',
	},
	defaultFromAddress: 'Samuel BERTHE <contact@samuel-berthe.fr>'
    }
};
