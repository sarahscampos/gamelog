const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User'); // Importe o modelo de usuário
require('dotenv').config();
const secretOrKey = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey, // Sua chave secreta
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id); // Busque o usuário pelo ID no payload do token
        if (user) {
          return done(null, user); // Usuário encontrado
        }
        return done(null, false); // Usuário não encontrado
      } catch (error) {
        console.error(error);
        return done(error, false); // Tratamento de erros
      }
    })
  );
};
