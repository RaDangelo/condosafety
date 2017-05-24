module.exports = function (app) {

    var Vehicle = require('../models/vehicle.vo');

    app.route('/vehicle')

        .get(function (req, res) {
            Vehicle.find(function (err, v) {
                if (err)
                    res.send(err)
                res.json(v);
            });
        })

        .post(function (req, res, next) {

            Vehicle.findById(req.param('_id'), function (err, v) {
                if (err) {
                    console.log('Erro ao cadastrar veículo: ' + err);
                    return next(err);
                }

                if (!v) {
                    Vehicle.findOne({ 'plate': req.param('plate') }, function (err, v) {

                        if (err) {
                            console.log('Erro ao cadastrar veículo: ' + err);
                            return next(err);
                        }

                        if (v) {
                            console.log('Veículo já cadastrado!');
                            var err = new Error('Veículo já cadastrado!');
                            err.status = 500;
                            return next(err);
                        }

                        var vehicle = new Vehicle(req.body);

                        vehicle.save(function (err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({ status: 200 });
                            }
                        });
                    });
                } else {
                    // atualiza veiculo
                    v.plate = req.param('plate');
                    v.brand = req.param('brand');
                    v.color = req.param('color');
                    v.status = req.param('status');

                    v.save(function (err) {
                        if (err) {
                            console.log('Erro ao alterar veículo: ' + err);
                            throw err;
                        }
                        console.log('Veículo alterado com sucesso!');
                        res.json({ status: 200 });
                    });
                }
            });
        });

    // delete pessoa
    app.post('/vehicle/delete', function (req, res) {
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
