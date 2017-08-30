module.exports = function (app) {

    var Person = require('../models/person.vo');
    var User = require('../models/user.vo');
    var Visitor = require('../models/visitor.vo');
    var Vehicle = require('../models/vehicle.vo');
    var Apartment = require('../models/apartment.vo');
    var bCrypt = require('bcrypt-nodejs');

    var filteredData = new Array();

    app.post(('/access/validate-pass'), function (req, res, next) {
        // let username = req.param('username') + ' ';
        let username = 'admin';
        console.log(req.param('username'))
        let pass = req.param('password');

        if (isNaN(req.param('username'))) {

            User.findOne({ 'username': username}, function (err, user) {
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
                }
            });
        } else {
            Person.findOne({ 'cpf': req.param('username') }, function (err, user) {
                if (err)
                    return next(err);

                if (!user) {
                    console.log('Usuário ' + req.param('username') + ' não encontrado!');
                    var err = new Error('Usuário não existente cadastrado!');
                    err.status = 500;
                    return next(err);
                }

                // Usuário existe mas a senha está errada
                if (!isValidPassword(user, req.param('password'))) {
                    console.log('Senha Inválida');
                    var err = new Error('Senha inválida!');
                    err.status = 401;
                    return next(err);
                }
            });
        }
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


