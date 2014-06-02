var cfg     = require('./config.json');
var colors  = require('colors');
var path    = require('path');
var events  = require('events');

var io      = require('socket.io-client');
var ee      = new events.EventEmitter();

var plugins = {};
var sock    = io.connect( cfg.connect );

// ee.on('core.connection', function( data ) {
//   console.log( 'core.connection', data );
// });

sock.on('connect', function() {
  console.log( 'connected to server' );
  ee.emit( 'core.connect', { connected: true });
});

sock.on('disconnect', function() {
  console.log( 'connected to server' );
  ee.emit( 'core.disconnect', { connected: false });
});


cfg.plugins = cfg.plugins || [];
cfg.plugins.forEach(function( plugin ) {

  var tmp = require( plugin );
  if ( tmp.plugin && tmp.plugin.name && tmp.init ) {
    plugins[tmp.plugin.name] = tmp;
    plugins[tmp.plugin.name].init( ee );
    console.log( 'load'.green, tmp.plugin.name );
  }
});


console.log( 'done' );