const mongoose	= require('mongoose');

const restaurantSchema = mongoose.Schema({
	name: {type: String, required: true},
	cuisine: {type: String, required: true},
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zipcode: {type: String}
}); //restaurantSchema	

const commentSchema = mongoose.Schema({
	author: {type: String, required: true},
	review: {type: String, required: true},
	created: {type: Date, default: Date.now},
	restaurant: {type: mongoose.Schema.ObjectId, ref: 'restaurant'}
}); //reviewSchema

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

commentSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		author: this.author,
		review: this.review,
		created: this.created,
		restaurant: this.restaurant
	}; //return
}; //whineSchema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Restaurant, Comment};