var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var sanitizeHtml = require('sanitize-html');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local            : {
        email        : { type: String, required: true },
        password     : { type: String, required: true },
    },
    name: { type: String, required: true },
    publicBio: String
});

// Automatically remove HTML from public facing fields on save
UserSchema.pre('save', function(next) {
  var sanitize = {
    allowedTags: [],
    allowedAttributes: []
  };

  this.name = sanitizeHtml(this.name, sanitize);
  this.publicBio = sanitizeHtml(this.publicBio, sanitize);
  
  next();
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);