var mongoose = require('mongoose');

module.exports = mongoose.model('Person', {
    name: String,
    nickname: String,
    accessPassword: String,
    phoneNumber: String,
    cpf: String,
    email: String,
    picture: { data: Buffer, contentType: String },
    status: Boolean,
    personType: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonType' },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }
}, 'person'
);
