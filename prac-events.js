const events = require('events');

const eventEmitter = new events.EventEmitter;

eventEmitter.on('end', function() {
  console.log('penis');
})

eventEmitter.emit('end');
