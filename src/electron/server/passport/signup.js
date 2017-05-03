var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/user.vo');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){

                User.findOne({ 'username' :  username }, function(err, user) {

                    if (err){
                        console.log('Erro ao cadastrar usuário: '+err);
                        return done(err);
                    }

                    // usuário existente
                    if (user) {
                        console.log('Usuário ' + username + ' já cadastrado!');
                        return done(null, false, req.flash('message','User já existente!'));
                    } else {
                        // se usuario nao existe, cria um novo
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.accessLevel = req.param('accessLevel');

                        // salva usuario
                        newUser.save(function(err) {
                            if (err){
                                console.log('Erro ao salvar usuário: '+err);  
                                throw err;  
                            }
                            console.log('Usuário registrado com sucesso!');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}