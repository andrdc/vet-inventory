const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LeashInstanceSchema = new Schema({
	leash: { type: Object, required: true },
	receive_date: { type: Date, required: true },
});

/* Export Model */
module.exports = mongoose.model('LeashInstance', LeashInstanceSchema);
