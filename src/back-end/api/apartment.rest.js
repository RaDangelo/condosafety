module.exports = function (app) {

    var Apartment = require('../models/apartment.vo');

    app.get('/apartment', function (req, res) {

        Apartment.find(function (err, apartments) {
            if (err)
                res.send(err)
            res.json(apartments);
        });
    });

    app.post('/apartment', function (req, res) {

        Apartment.findById(req.param('_id'), function (err, apt) {

            if (err) {
                console.log('Erro ao cadastrar apartamento: ' + err);
                return done(err);
            }

            if (!apt) {
                Apartment.findOne({ 'complex': req.param('complex'), 'floor': req.param('floor') }, function (err, apt) {

                    if (err) {
                        console.log('Erro ao cadastrar apartamento: ' + err);
                        return done(err);
                    }

                    if (apt) {
                        console.log('Apartamento no compelexo: ' + apt.complex + ' de número:' + apt.number + ' já cadastrado!');
                        return done(null, false, { message: 'Apartamento já cadastrado!' });
                    }

                    var aptartment = new Apartment(req.body);

                    aptartment.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send('Apartamento salvo com sucesso!');
                        }
                    });
                });
            } else {
                // atualiza apt
                apt = req.body;
                // atualizar um por um?
                apt.save(function (err) {
                    if (err) {
                        console.log('Erro ao alterar apartamento: ' + err);
                        throw err;
                    }
                    console.log('Apartamento alterado com sucesso!');
                    return done(null, apt);
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
