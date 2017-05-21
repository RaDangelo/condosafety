var mongoose = require('mongoose');

module.exports = mongoose.model('Access', {
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
    // type: AccessType; ENUM
}, 'access'
);
