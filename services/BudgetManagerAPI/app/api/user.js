const mongoose = require('mongoose');

const api = {};

api.setup = ( User ) => ( req, res ) => {

  const admin = new User({
    username: 'nacho',
    password: 'admin',
    clients: []
  });

  admin.save( error => {

    if (error) throw error;
    console.log('Admin good!');
    res.json( { success: true } );

  });

};

api.index = ( User, BudgetToken ) => ( req, res ) => {

  const token = BudgetToken;

  if (token) {

    User.find( {}, ( error, users ) => {

      if (error) throw error;
      res.status(200).json(users);

    });

  } else return res.status(403).send( { success: false, message: 'Not!' } );

};

api.signup = ( User ) => ( req, res ) => {

  if ( !req.body.username || !req.body.password ) res.json( { success: false, message: 'user || pwd missing' } );

  else {

    const newUser = new User ({
      username: req.body.username,
      password: req.body.password,
      clients: []
    });

    newUser.save( ( error ) => {

      if ( error ) return res.status(500).json( { success: false, message: 'username already exists' });
      res.json( { success: true, message: 'Account created' } );

    });

  }

};

module.exports = api;
