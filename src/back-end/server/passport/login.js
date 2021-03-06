var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user.vo');
var Crypto = require('../../config/crypto');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },

        function (req, username, password, done) {
            User.findOne({ 'username': username },
                function (err, user) {

                    // Erro
                    if (err)
                        return done(err);

                    // Nome de usuário não existe, loga o erro e redireciona de volta
                    if (!user) {
                        console.log('Usuário ' + username + ' não encontrado!');
                        return done(null, false,
                            { message: 'Usuário não existente!' });
                    }

                    // Usuário existe mas a senha está errada
                    if (!Crypto.isValidPassword(user, password)) {
                        console.log('Senha Inválida');
                        return done(null, false,
                            { message: 'Senha inválida!' });
                    }

                    // retorna usuario com sucesso
                    return done(null, user);
                }
            );
        }));

}

    // falha = primeiroparametro === true || segundoparametro === false
    // sucesso = primeiroparametro  === null && segundoparametro === true