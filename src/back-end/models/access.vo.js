var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Access', {
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    person: { type: Schema.Types.ObjectId, ref: 'Person' },
    visitor: { type: Schema.Types.ObjectId, ref: 'Visitor' },
    type: { type: String },
    action: { type: String },
    observation: { type: String }
}, 'access'
);