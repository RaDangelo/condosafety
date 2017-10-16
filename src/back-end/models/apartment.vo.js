var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Apartment', {
    floor: Number,
    number: Number,
    status: Boolean,
    complex: String,
    type: String,
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
}, 'apartment'
);