//Middleware used to tell the application to go to the next call
var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next()
  };

  module.exports = myLogger;