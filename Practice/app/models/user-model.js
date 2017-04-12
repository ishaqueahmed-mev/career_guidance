// user model
var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
	local : {
		username: { type: String, unique: true },
		password: String
	},
	 facebook : {
        id           : String,
        token        : String,
        email        : String,
        displayName  : String
    },
	twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// UserSchema.methods.generateHash = function(password) {
    // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
    // return bcrypt.compareSync(password, this.local.password);
// };

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);