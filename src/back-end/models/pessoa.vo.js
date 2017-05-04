var mongoose = require('mongoose');

module.exports = mongoose.model('Pessoa', {
    nome: String,
    apelido: String,
    tipo: String,
    apartamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartamento' }
}
);
