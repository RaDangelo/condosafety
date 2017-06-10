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
    personType: { type: Object, ref: 'PersonType' },
    apartment: { type: Object, ref: 'Apartment' }
}, 'person'
);
