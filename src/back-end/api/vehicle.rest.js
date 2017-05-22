module.exports = function (app) {

    var Vehicle = require('../models/vehicle.vo');

    app.get('/vehicle', function (req, res) {
        Vehicle.find(function (err, v) {
            if (err)
                res.send(err)
            res.json(v);
        });
    });

    app.post('/vehicle', function (req, res) {

        Vehicle.findById(req.param('_id'), function (err, v) {
            if (err) {
                console.log('Erro ao cadastrar veículo: ' + err);
                return done(err);
            }

            if (!v) {
                Vehicle.findOne({ '_id': req.param('_id') }, function (err, v) {

                    if (err) {
                        console.log('Erro ao cadastrar veículo: ' + err);
                        return done(err);
                    }

                    if (v) {
                        console.log('Veículo já cadastrado!');
                        return done(null, false, { message: 'Veículo já cadastrado!' });
                    }

                    var vehicle = new Vehicle(req.body);

                    vehicle.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send('Veículo salvo com sucesso!');
                        }
                    });
                });
            } else {
                // atualiza veiculo
                v = req.body;
                // atualizar um por um?
                v.save(function (err) {
                    if (err) {
                        console.log('Erro ao alterar veículo: ' + err);
                        throw err;
                    }
                    console.log('Veículo alterado com sucesso!');
                    return done(null, apt);
                });
            }
        });
    });

    // delete pessoa
    app.delete('/vehicle/delete', function (req, res) {
        Vehicle.remove({
            _id: req.body._id
        }, function (err, v) {
            if (err)
                res.send(err);

            Vehicle.find(function (err, v) {
                if (err)
                    res.send(err)
                res.json(v);
            });
        });
    });
}
