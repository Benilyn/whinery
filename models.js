const mongoose	= require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const whineSchema = mongoose.Schema({
	author: {type: mongoose.Schema.ObjectId, ref: 'User'},
	created: {type: Date, default: Date.now},
	restaurant: {type: String},
	restaurantName: {type: String},
	food: {type: String},
	service: {type: String},
	cleanliness: {type: String},
	price: {type: String},
	review: {type: String}
}); //whineSchema

whineSchema.methods.apiRepr = function() {
	
	return {
		id: this._id,
		created: this.created.toDateString(),
		author: this.author.firstName + ' ' + this.author.lastName,
		restaurant: this.restaurant,
		restaurantName: this.restaurantName,
		food: this.food,
		service: this.service,
		cleanliness: this.cleanliness,
		price: this.price,
		review: this.review
	}; //return
}; //whineSchema


const userSchema = mongoose.Schema({
	firstName:{type: String, required: true},
	lastName: {type: String, required: true},
	phone: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true},
	demo:{type: Boolean}
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		firstName: this.firstName,
		lastName: this.lastName,
		phone: this.phone,
		email: this.email
	}; //return
}; //userSchema

const Whine = mongoose.model('Whine', whineSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Whine, User};