const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema({
	name: { type: String, required: true },
});

/* Export Model */
module.exports = mongoose.model('Brand', BrandSchema);
