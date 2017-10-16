var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user.vo');
var Crypto = require('../../config/crypto');

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {

            findOrCreateUser = function () {
                User.findById(req.param('_id'), function (err, user) {

                    if (err) {
                        console.log('Erro ao cadastrar usuário: ' + err);
                        return done(err);
                    }

                    if (!user) {

                        User.findOne({ 'username': username }, function (err, user) {

                            if (err) {
                                console.log('Erro ao cadastrar usuário: ' + err);
                                return done(err);
                            }

                            // usuário existente
                            if (user) {
                                console.log('Usuário ' + username + ' já cadastrado!');
                                return done(null, false, { message: 'Usuário já cadastrado!' });

                            }
                            // se usuario nao existe, cria um novo
                            var newUser = new User();
                            newUser.username = username;
                            newUser.password = Crypto.createHash(password);
                            newUser.accessLevel = req.param('accessLevel');

                            // salva usuario
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Erro ao salvar usuário: ' + err);
                                    throw err;
                                }
                                console.log('Usuário salvo com sucesso!');
                                return done(null, newUser);
                            });
                        });
                    } else {
                        // atualiza usuario
                        user.username = username;
                        if (user.password === password) {
                            user.password = password;
                        } else {
                            user.password = createHash(password);
                        }
                        user.accessLevel = req.param('accessLevel');

                        user.save(function (err) {
                            if (err) {
                                console.log('Erro ao alterar usuário: ' + err);
                                throw err;
                            }
                            console.log('Usuário alterado com sucesso!');
                            return done(null, user);
                        });
                    }
                });
            }
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
}