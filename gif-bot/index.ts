import Symphony from 'symphony-api-client-node'

const onMessage = (messages: Symphony.Message[]): void => {
  messages.forEach((message) => {
    console.log(
      'The BOT heard "' + message.messageText + '" from ' + message.user.displayName
    )
  })
}

const onError = (error): void => {
  console.error('Error reading data feed', error)
}

// eslint-disable-next-line no-path-concat
Symphony.initBot(__dirname + '/config.json')
  .then(() => {
    Symphony.getDatafeedEventsService({ onMessage, onError })
  })
  .fail(err => {
    console.error(err)
  })
