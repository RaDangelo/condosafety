module.exports = function (app) {

    var Person = require('../models/person.vo');
    var Apartment = require('../models/apartment.vo');
    var PersonType = require('../models/person-type.vo');

    app.route('/person')

        .get(function (req, res) {
            Person.find(function (err, people) {
                if (err)
                    res.send(err)
                res.json(people);
            });
        })

        .post(function (req, res, next) {

            Person.findById(req.param('_id'), function (err, p) {
                if (err) {
                    console.log('Erro ao cadastrar pessoa: ' + err);
                    return next(err);
                }

                if (!p) {
                    Person.findOne({ 'cpf': req.param('cpf') }, function (err, p) {

                        if (err) {
                            console.log('Erro ao cadastrar pessoa: ' + err);
                            return next(err);
                        }

                        if (p) {
                            console.log('Pessoa com o documento: ' + p.cpf + ' já cadastrada!');
                            var err = new Error('Pessoa já cadastrada!');
                            err.status = 500;
                            return next(err);
                        }

                        var person = new Person(req.body);
                        person.accessPassword = createHash(person.accessPassword);

                        person.save(function (err) {
                            if (err) {
                                console.log('Erro ao cadastrar pessoa: ' + err);
                                res.send(err);
                            } else {
                                console.log('Pessoa cadastrada com sucesso!');
                                res.json({ status: 200 });
                            }
                        });
                    });
                } else {
                    // atualiza pessoa
                    p.name = req.param('name');
                    p.nickname = req.param('nickname');
                    if (p.accessPassword === req.param('accessPassword')) {
                        p.accessPassword = req.param('accessPassword');
                    } else {
                        p.accessPassword = createHash(req.param('accessPassword'));
                    }
                    p.phoneNumber = req.param('phoneNumber');
                    p.cpf = req.param('cpf');
                    p.email = req.param('email');
                    p.status = req.param('status');
                    p.personType = req.param('personType');
                    p.apartment = req.param('apartment');

                    // atualizar um por um?
                    p.save(function (err) {
                        if (err) {
                            console.log('Erro ao alterar pessoa: ' + err);
                            throw err;
                        }
                        console.log('Pessoa alterada com sucesso!');
                        res.json({ status: 200 });
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

// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}