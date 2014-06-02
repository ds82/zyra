var cfg    = require('./config.json');
var app    = require('express')();
var server = require('http').Server(app);
var io     = require('socket.io')(server);

io.on('connect', function( socket ){
  console.log( 'sb connected' );
});

server.listen( cfg.port, function() {
  console.log( 'listen to port ' + cfg.port );
});
