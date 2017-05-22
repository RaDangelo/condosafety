module.exports = function (app) {

    var Visitor = require('../models/visitor.vo');

    app.get('/visitante', function (req, res) {
        Visitor.find(function (err, visitor) {
            if (err)
                res.send(err)
            res.json(visitor);
        });
    });

    app.post('/visitor', function (req, res) {

        Visitor.findById(req.param('_id'), function (err, v) {
            if (err) {
                console.log('Erro ao cadastrar visitante: ' + err);
                return done(err);
            }

            if (!v) {
                Visitor.findOne({ 'document': req.param('document') }, function (err, visitor) {

                    if (err) {
                        console.log('Erro ao cadastrar visitante: ' + err);
                        return done(err);
                    }

                    if (visitor) {
                        console.log('Visitante com o documento: ' + visitor.document + ' já cadastrado!');
                        return done(null, false, { message: 'Visitante já cadastrado!' });
                    }

                    var visitor = new Visitor(req.body);

                    visitor.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send('Visitante salvos com sucesso!');
                        }
                    });
                });
            } else {
                // atualiza visitante
                v = req.body;
                // atualizar um por um?
                v.save(function (err) {
                    if (err) {
                        console.log('Erro ao alterar visitante: ' + err);
                        throw err;
                    }
                    console.log('Visitante alterado com sucesso!');
                    return done(null, v);
                });
            }
        });
    });

    // delete pessoa
    app.delete('/visitor/delete', function (req, res) {
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
