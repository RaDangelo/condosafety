var mongoose = require('mongoose');

module.exports = mongoose.model('Access', {
    date: Date,
    user: { type: Object, ref: 'User' },
    apartment: { type: Object, ref: 'Apartment' },
    vehicle: { type: Object, ref: 'Vehicle' },
    person: { type: Object, ref: 'Person' },
    visitor: { type: Object, ref: 'Visitor' },
    type: { type: String },
    action: { type: String }
}, 'access'
);
