module.exports = function (app) {

    var Visitor = require('../models/visitor.vo');

    app.route('/visitante')

        .get(function (req, res) {
            Visitor.find(function (err, visitor) {
                if (err)
                    res.send(err)
                res.json(visitor);
            });
        })

        .post(function (req, res, next) {

            Visitor.findById(req.param('_id'), function (err, v) {
                if (err) {
                    console.log('Erro ao cadastrar visitante: ' + err);
                    return next(err);
                }

                if (!v) {
                    Visitor.findOne({ 'document': req.param('document') }, function (err, visitor) {

                        if (err) {
                            console.log('Erro ao cadastrar visitante: ' + err);
                            return next(err);
                        }

                        if (visitor) {
                            console.log('Visitante com o documento: ' + visitor.document + ' já cadastrado!');
                            var err = new Error('Visitante já cadastrado!');
                            err.status = 500;
                            return next(err);
                        }

                        var visitor = new Visitor(req.body);

                        visitor.save(function (err) {
                            if (err) {
                                console.log('Erro ao cadastrar visitante: ' + err);
                                res.send(err);
                            } else {
                                console.log('Visitante cadastrado com sucesso!');
                                res.json({ status: 200 });
                            }
                        });
                    });
                } else {
                    // atualiza visitante
                    v.name = req.param('name');
                    v.document = req.param('document');
                    v.documentType = req.param('documentType');
                    v.obs = req.param('obs');

                    // atualizar um por um?
                    v.save(function (err) {
                        if (err) {
                            console.log('Erro ao alterar visitante: ' + err);
                            throw err;
                        }
                        console.log('Visitante alterado com sucesso!');
                        res.json({ status: 200 });
                    });
                }
            });
        });

    // delete pessoa
    app.post('/visitor/delete', function (req, res) {
        Visitor.remove({
            _id: req.body._id
        }, function (err, v) {
            if (err)
                res.send(err);

            Visitor.find(function (err, v) {
                if (err)
                    res.send(err)
                res.json(v);
            });
        });
    });
}
