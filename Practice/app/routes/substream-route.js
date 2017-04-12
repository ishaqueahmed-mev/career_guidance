var substreamCtrl = require('../controllers/substream-controller');

module.exports = function(app) {
	app.post('/substream', substreamCtrl.create);
};