var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Apartment', {
    floor: String,
    number: String,
    status: Boolean,
    complex: String,
    type: String,
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
}, 'apartment'
);