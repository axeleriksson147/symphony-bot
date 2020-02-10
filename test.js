const Symphony = require('symphony-api-client-node');

const botHearsSomething = ( event, messages ) => {
    messages.forEach( (message, index) => {
      console.log( 'The BOT heard "' + message.messageText +'" from ' + message.initiator.user.displayName );
    })
}

Symphony.initBot(__dirname + '/config.json')
  .then( (symAuth) => {
    Symphony.getDatafeedEventsService( botHearsSomething );
  })