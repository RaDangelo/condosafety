var mongoose = require('mongoose');

module.exports = mongoose.model('Apartamento', {
    andar: Number,
    numApto: Number,
}
);