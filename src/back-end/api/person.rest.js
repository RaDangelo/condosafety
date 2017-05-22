module.exports = function (app) {

    var Person = require('../models/person.vo');
    var Apartment = require('../models/apartment.vo');
    var PersonType = require('../models/person-type.vo');

    app.get('/person', function (req, res) {
        Pessoa.find(function (err, people) {
            if (err)
                res.send(err)
            res.json(people);
        });
    });

    app.post('/person', function (req, res) {

        Person.findById(req.param('_id'), function (err, p) {
            if (err) {
                console.log('Erro ao cadastrar pessoa: ' + err);
                return done(err);
            }

            if (!p) {
                Person.findOne({ 'cpf': req.param('cpf') }, function (err, p) {

                    if (err) {
                        console.log('Erro ao cadastrar apartamento: ' + err);
                        return done(err);
                    }

                    if (p) {
                        console.log('Pessoa com o documento: ' + ap.cpf + ' já cadastrada!');
                        return done(null, false, { message: 'Pessoa já cadastrada!' });
                    }

                    var person = new Person(req.body);
                    // var apt = new Apartment(req.body.apartment);
                    // var type = new PersonType(req.body.personType);
                    // person.apartment = apt._id;
                    // person.personType = type._id;

                    pessoa.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            // apt.save(function (err) {
                            //     if (err) {
                            //         res.send(err);
                            //     }
                            // });
                            // type.save(function (err) {
                            //     if (err) {
                            //         res.send(err);
                            //     }
                            // });
                            res.send('Pessoa salva com sucesso!');
                        }
                    });
                });
            } else {
                // atualiza pessoa
                p = req.body;
                // atualizar um por um?
                p.save(function (err) {
                    if (err) {
                        console.log('Erro ao alterar pessoa: ' + err);
                        throw err;
                    }
                    console.log('Pessoa alterada com sucesso!');
                    return done(null, p);
                });
            }
        });
    });

    // delete pessoa
    app.post('/person/delete', function (req, res) {
        Person.remove({
            _id: req.body._id
        }, function (err, p) {
            if (err)
                res.send(err);

            Person.find(function (err, p) {
                if (err)
                    res.send(err)
                res.json(p);
            });
        });
    });
}
