module.exports = function (app) {

    var PersonType = require('../models/person-type.vo');

    app.get('/person-type', function (req, res) {

        PersonType.find(function (err, types) {
            if (err)
                res.send(err)
            res.json(types);
        });
    });

    app.post('/person-type', function (req, res) {

        PersonType.findOne({ 'type': req.param('type') }, function (err, type) {

            if (err) {
                console.log('Erro ao cadastrar tipo de pessoa: ' + err);
                return done(err);
            }

            if (type) {
                console.log('Tipo de pessoa: ' + type.type + ' já cadastrado!');
                return done(null, false, { message: 'Tipo de Pessoa já cadastrado!' });
            }

            var type = new PersonType(req.body);

            type.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Tipo de pessoa cadastrado com sucesso!');
                }
            });
        });
    });


    app.post('/person-type/delete', function (req, res) {
        PersonType.remove({
            _id: req.body._id
        }, function (err, type) {
            if (err)
                res.send(err);

            PersonType.find(function (err, type) {
                if (err)
                    res.send(err)
                res.json(type);
            });
        });
    });
}
