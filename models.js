const mongoose	= require('mongoose');

const restaurantSchema = mongoose.Schema({
	name: {type: String, required: true},
	cuisine: {type: String, required: true},
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zipcode: {type: String}
}); //restaurantSchema	

restaurantSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		name: this.name,
		cuisine: this.cuisine,
		address: this.address,
		city: this.city,
		state: this.state,
		zipcode: this.zipcode
	}; //return
}; //restaurantSchema.methods.apiRepr


const whineSchema = mongoose.Schema({
	author: {type: String, required: true},
	review: {type: String, required: true},
	created: {type: Date, default: Date.now},
	restaurant: {type: mongoose.Schema.ObjectId, ref: 'restaurant'}
}); //reviewSchema

whineSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		author: this.author,
		review: this.review,
		created: this.created,
		restaurant: this.restaurant
	}; //return
}; //commentSchema


const userSchema = mongoose.Schema({
	firstName:{type: String, required: true},
	lastName: {type: String, required: true},
	phone: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true},
});

userSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		firstName: this.firstName,
		lastName: this.lastName,
		phone: this.phone,
		email: this.email,
		password: this.password
	}; //return
}; //userSchema


const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Whine = mongoose.model('Whine', whineSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Restaurant, Whine, User};