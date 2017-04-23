module.exports = function (app) {

    var Pessoa = require('../models/pessoa.vo');
    var Apartamento = require('../models/apartamento.vo');

    app.get('/pessoa', function (req, res) {

        Pessoa.find(function (err, pessoas) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(pessoas); // return all pessoas in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/pessoa', function (req, res) {

        var pessoa = new Pessoa(req.body);
        var apto = new Apartamento(req.body.apartamento);

        Pessoa.create({
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
    app.delete('/pessoa/:pessoa_id', function (req, res) {
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
