const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LeashSchema = new Schema({
	material: { type: String, required: true },
	price_vet: { type: Number, required: true },
	price_public: { type: Number, required: true },
	brand: { type: Object, required: true },
	name: { type: String, required: true }
});

/* Export Model */
module.exports = mongoose.model('Leash', LeashSchema);
