module.exports = function (app) {

    var Person = require('../models/person.vo');
    var User = require('../models/user.vo');
    var Visitor = require('../models/visitor.vo');
    var Vehicle = require('../models/vehicle.vo');
    var Access = require('../models/access.vo');
    var Apartment = require('../models/apartment.vo');
    var bCrypt = require('bcrypt-nodejs');

    var filteredData = new Array();

    app.post(('/access/validate-pass'), function (req, res, next) {
        let pass = req.param('password');

        User.findOne({ 'username': req.param('username') }, function (err, user) {
            if (err)
                return next(err);

            if (!user) {
                console.log('Usuário ' + req.param('username') + ' não encontrado!');
                var err = new Error('Usuário não existente!');
                err.status = 500;
                return next(err);
            }

            // Usuário existe mas a senha está errada
            if (!isValidPassword(user, pass)) {
                console.log('Senha Inválida');
                var err = new Error('Senha inválida!');
                err.status = 401;
                return next(err);
            } else {
                return res.json(true);
            }
        });
    });

    app.post(('/access/'), function (req, res, next) {
        var access = new Access(req.body);
        User.findOne({ 'username': access.user.username }, function (err, user) {
            if (err)
                return next(err);

            if (!user) {
                console.log('Usuário ' + access.user.username + ' não encontrado!');
                var err = new Error('Usuário não existente!');
                err.status = 500;
                return next(err);
            } else {
                access.user = user;
                access.save(function (err) {
                    if (err) {
                        console.log('Erro ao registrar acesso: ' + err);
                        res.send(err);
                    } else {
                        console.log('Acesso registrado com sucesso!');
                        res.json(true);
                    }
                });
            }
        });



    });


    app.get(('/access/filter/:filter'), function (req, res, next) {

        if (isNaN(req.params.filter)) {

            console.log('isNan');
            Visitor.find({ 'name': new RegExp(req.params.filter, "i") }, function (err, v) {
                if (err)
                    res.send(err)
                v.forEach(item => {
                    filteredData.push(item);
                })

                Person.find({ 'name': new RegExp(req.params.filter, "i") }, function (err, p) {
                    if (err)
                        res.send(err)
                    console.log(p);
                    p.forEach(item => {
                        filteredData.push(item);
                    })

                    Vehicle.find({ 'brand': new RegExp(req.params.filter, "i") }, function (err, v) {
                        if (err)
                            res.send(err)
                        v.forEach(item => {
                            Apartment.findOne({
                                'vehicles': { $elemMatch: { '_id': item._id } }
                            }, function (err, apt) {
                                if (err)
                                    res.send(err)
                                if (apt) {
                                    item.apartment.complex = apt.complex;
                                    item.apartment.number = apt.number;
                                }
                            });
                            filteredData.push(item);
                        })

                        Vehicle.find({ 'plate': new RegExp(req.params.filter, "i") }, function (err, v) {
                            if (err)
                                res.send(err)
                            v.forEach(item => {
                                Apartment.findOne({
                                    'vehicles': {
                                        $elemMatch: { '_id': item._id }
                                    }
                                }, function (err, apt) {
                                    console.log('APT', apt)
                                    if (err)
                                        res.send(err)
                                    if (apt) {
                                        item.apartment.complex = apt.complex;
                                        item.apartment.number = apt.number;
                                    }
                                });
                                filteredData.push(item);
                            });

                            console.log(filteredData);
                            res.json(filteredData);
                            filteredData = new Array();
                        });
                    });

                });
            });

        } else {
            console.log('!isNan');

            Visitor.find({ 'document': req.params.filter }, function (err, v) {
                if (err)
                    res.send(err)
                v.forEach(item => {
                    filteredData.push(item);
                })

                Person.find({ 'cpf': req.params.filter }, function (err, p) {
                    if (err)
                        res.send(err)
                    console.log(p);
                    p.forEach(item => {
                        filteredData.push(item);
                    })
                    console.log(filteredData);
                    res.json(filteredData);
                    filteredData = new Array();
                });
            });
        }

    });

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password)
    }
}


