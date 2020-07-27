const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodInstanceSchema = new Schema({
	food: { type: Object, required: true },
	receive_date: { type: Date, required: true },
	expiration_date: { type: Date, required: true }
});

/* Export Model */
module.exports = mongoose.model('FoodInstance', FoodInstanceSchema);
