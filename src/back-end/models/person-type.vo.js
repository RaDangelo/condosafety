var mongoose = require('mongoose');

module.exports = mongoose.model('PersonType', {
    type: String
}, 'person-type'
);