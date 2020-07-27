const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	type: { type: String, required: true },
	weigth: { type: Number, required: true },
	price_vet: { type: Number, required: true },
	price_public: { type: Number, required: true },
	brand: { type: Object, required: true },
	name: { type: String, required: true }
});

/* Export Model */
module.exports = mongoose.model('Food', FoodSchema);
