var pg   = require('piglow');

function subscribe( ee, pi ) {
  console.log( 'piglow subscribe' );
  
  ee.on('core.connect', function( data ) {

    var brightness = ( data.connected ) ? 100 : 0;
    pi.reset;
    pi.l_0_0 = 100;
    pi.l_1_0 = 100;
    pi.l_2_0 = 100;
    console.log( 'piglow', pi );
  });

  ee.on('core.disconnect', function( data ) {

    pi.reset;
    pi.l_0_1 = 100;
    pi.l_1_1 = 100;
    pi.l_2_1 = 100;
    console.log( 'piglow', pi );
  });
}

function init( ee ) {

  pg(function( error, pi ) {
    pi.reset;
    subscribe( ee, pi );
  });
}

module.exports.init = init;
module.exports.plugin = {
  name: 'piGlow'
};