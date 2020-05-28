const mongoose = require('mongoose');

const RetailPriceSchema = mongoose.Schema({
	product_id: { type : String , unique : true, required : true, dropDups: true },
    value: Number,
    currency_code: String
}, {
    timestamps: true
});

module.exports = mongoose.model('RetailPrice', RetailPriceSchema);