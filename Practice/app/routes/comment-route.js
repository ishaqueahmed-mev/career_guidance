var	commentCtrl = require('../controllers/comment-controller');
	
module.exports = function(app) {
	app.post('/comment/create', commentCtrl.create);
}