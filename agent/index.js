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


var db = {};

cfg.plugins = cfg.plugins || [];
cfg.plugins.forEach(function( item ) {

  var plugin = item[0],
      opts   = item[1];

  opts.interval = opts.interval || 1000;

  var tmp = require( plugin );
  if ( tmp.plugin && tmp.plugin.name && tmp.register ) {
    db[tmp.plugin.name] = [];
    
    plugins[tmp.plugin.name] = tmp;
    
    plugins[tmp.plugin.name].register( opts, function( data ) {
      db[tmp.plugin.name].push( data );
    });
    
    console.log( 'load'.green, tmp.plugin.name );
  }
});


setInterval(function() {
  console.log( 'emit data', db );
  sock.emit( 'data', db );
  for( var k in db ) {
    db[k] = [];
  }
}, 5000 );


console.log( 'done' );