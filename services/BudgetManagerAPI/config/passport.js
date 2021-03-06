const PassportJWT = require('passport-jwt'),
      ExtractJwt  = PassportJWT.ExtractJwt,
      Strategy    = PassportJWT.Strategy,
      config      = require('./index.js'),
      models      = require('@BudgetManager/app/setup');

module.exports = ( passport ) => {

  const User = models.User;

  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  passport.use( new Strategy( parameters, ( payload, done )  => {

    User.findOne( { id: payload.id }, ( error, user ) => {

      if ( error ) return done( error, false );
      if ( user ) return done( null, user );
      else done( null, false )

    });

  }));

};
