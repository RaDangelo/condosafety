module.exports = function (app) {

    var Apartment = require('../models/apartment.vo');

    app.route('/apartment')

        .get(function (req, res) {

            Apartment.find(function (err, apartments) {
                if (err)
                    res.send(err)
                res.json(apartments);
            });
        })

        .post(function (req, res, next) {

            Apartment.findById(req.param('_id'), function (err, apt) {

                if (err) {
                    console.log('Erro ao cadastrar apartamento: ' + err);
                    return next(err);
                }

                if (!apt) {
                    Apartment.findOne({ 'complex': req.param('complex'), 'floor': req.param('floor') }, function (err, apt) {

                        if (err) {
                            console.log('Erro ao cadastrar apartamento: ' + err);
                            return next(err);
                        }

                        if (apt) {
                            console.log('Apartamento no compelexo: ' + apt.complex + ' de número:' + apt.number + ' já cadastrado!');
                            var err = new Error('Apartamento já cadastrado!');
                            err.status = 500;
                            return next(err);
                        }

                        var apartment = new Apartment(req.body);

                        apartment.save(function (err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({ status: 200 });
                            }
                        });
                    });
                } else {
                    // atualiza apt
                    apt.floor = req.param('floor');
                    apt.number = req.param('number');
                    apt.complex = req.param('complex');
                    apt.type = req.param('type');
                    apt.vehicles = req.param('vehicles');
                    apt.status = req.param('status');

                    // atualizar um por um?
                    apt.save(function (err) {
                        if (err) {
                            console.log('Erro ao alterar apartamento: ' + err);
                            throw err;
                        }
                        console.log('Apartamento alterado com sucesso!');
                        res.json({ status: 200 });
                    });
                }
            });
        });

    app.post('/apartment/delete', function (req, res) {
        Apartment.remove({
            _id: req.body._id
        }, function (err, apartment) {
            if (err)
                res.send(err);

            Apartment.find(function (err, apartment) {
                if (err)
                    res.send(err)
                res.json(apartment);
            });
        });
    });
}
