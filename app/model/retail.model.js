const mongoose = require('mongoose');

const RetailPriceSchema = mongoose.Schema({
	product_id: Number,
    value: Number,
    currency_code: String
}, {
    timestamps: true
});

module.exports = mongoose.model('RetailPrice', RetailPriceSchema);