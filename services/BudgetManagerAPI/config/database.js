module.exports = ( mongoose, config ) => {

  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect( config.database, {
    promiseLibrary: global.Promise
  });

  database.on( 'error', error => console.log(`DB connection fail: ${error}`) );
  database.on( 'connected', () => console.log('DB connected') );
  database.on( 'disconnected', () => console.log('DB disconnected') );

  process.on( 'SIGINT', () => {
    database.close( () => {
      console.log('DB connection terminated');
      process.exit(0);
    });
  });

}
