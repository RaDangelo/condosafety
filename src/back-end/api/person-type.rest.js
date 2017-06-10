module.exports = function (app) {

    var PersonType = require('../models/person-type.vo');

    app.route('/person-type')

        .get(function (req, res) {

            PersonType.find(function (err, types) {
                if (err)
                    res.send(err)
                res.json(types);
            });
        })

        .post(function (req, res, next) {

            PersonType.findOne({ 'type': req.param('type') }, function (err, type) {

                if (err) {
                    console.log('Erro ao cadastrar tipo de pessoa: ' + err);
                    return next(err);
                }

                if (type) {
                    console.log('Tipo de pessoa: ' + type.type + ' já cadastrado!');
                    var err = new Error('Tipo de pessoa já cadastrado!');
                    err.status = 500;
                    return next(next);
                }

                var type = new PersonType(req.body);

                type.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log('Tipo de pessoa cadastrado com sucesso!');
                        res.json({ status: 200 });
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
