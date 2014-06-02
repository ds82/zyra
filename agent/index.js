var cfg = require('./config.json');
var io  = require('socket.io-client');

io.connect( cfg.connect );

console.log( 'done' );