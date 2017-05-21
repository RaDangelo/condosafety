module.exports = function (app) {

    var Apartment = require('../models/apartamento.vo');

    app.get('/apartment', function (req, res) {

        Apartment.find(function (err, apartments) {
            if (err)
                res.send(err)
            res.json(apartments);
        });
    });

    app.post('/apartment', function (req, res) {

        var apt = new Apartment(req.body);

        Apartment.create({
            nome: pessoa.nome,
            apelido: pessoa.apelido,
            tipo: pessoa.tipo,
            apartamento: apto._id
        }, function (err) {
            if (err) {
                res.send(err);
            } else {
                apto.save({
                    andar: apto.andar,
                    numApto: apto.numApto
                }, function (err) {
                    if (err) {
                        res.send(err);
                    }
                });
                res.send('Pessoa salva com sucesso!');
            }
        });
    });

    // delete pessoa
    app.delete('/person/:person_id', function (req, res) {
        Pessoa.remove({
            _id: req.params.pessoa_id
        }, function (err, pessoa) {
            if (err)
                res.send(err);

            Pessoa.find(function (err, pessoas) {
                if (err)
                    res.send(err)
                res.json(pessoas);
            });
        });
    });
}
