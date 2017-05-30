module.exports = function (app) {

    var AfkTime = require('../models/afk-time.vo');

    app.route('/afk-time')

        .get(function (req, res) {

            AfkTime.findOne(function (err, afk) {
                if (err)
                    res.send(err)
                res.json(afk);
            });
        })

        .post(function (req, res, next) {

            AfkTime.findOne(function (err, afk) {

                if (err) {
                    console.log('Erro ao cadastrar tempo de ociosidade: ' + err);
                    return next(err);
                }

                if (!afk) {
                    var afkTime = new AfkTime(req.body);
                    console.log(afkTime);
                    
                    afkTime.time = req.param('time');
                    afkTime.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({ status: 200 });
                        }
                    });
                } else {
                    afk.time = req.param('time');
                    afk.save(function (err) {
                        if (err) {
                            console.log('Erro ao alterar tempo de ociosidade: ' + err);
                            throw err;
                        }
                        console.log('Tempo de ociosidade alterado com sucesso!');
                        res.json({ status: 200 });
                    });
                }
            });
        });

}