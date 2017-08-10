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
	author: {type: mongoose.Schema.ObjectId, ref: 'User'},
	created: {type: Date, default: Date.now},
	restaurant: {type: String},
	restaurantName: {type: String},
	food: {type: String},
	service: {type: String},
	cleanliness: {type: String},
	price: {type: String},
	review: {type: String}
}); //reviewSchema

whineSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		created: this.created,
		author: this.author.firstName + ' ' + this.author.lastName,
		restaurant: this.restaurant,
		restaurantName: this.restaurantName,
		food: this.food,
		service: this.service,
		cleanliness: this.cleanliness,
		price: this.price,
		review: this.review
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
	//	email: this.email,
	//	password: this.password
	}; //return
}; //userSchema


const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Whine = mongoose.model('Whine', whineSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Restaurant, Whine, User};