const mongoose	= require('mongoose');

const restaurantSchema = mongoose.Schema({
	name: {type: String, required: true},
	cuisine: {type: String, required: true},
	address: {type: String, required: true}
}); //restaurantSchema	

const commentSchema = mongoose.Schema({
	author: {type: String},
	content: {type: String},
	created: {type: Date, default: Date.now}
}); //reviewSchema

restaurantSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		name: this.name,
		cuisine: this.cuisine,
		address: this.address
	}; //return
}; //restaurantSchema.methods.apiRepr

commentSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		author: this.author,
		content: this.content,
		created: this.created
	}; //return
}; //whineSchema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Restaurant, Comment};