var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Person', {
    name: String,
    nickname: String,
    accessPassword: String,
    phoneNumber: String,
    cpf: String,
    email: String,
    picture: String,
    status: Boolean,
    personType: { type: Schema.Types.ObjectId, ref: 'PersonType' },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' }
}, 'person'
);
