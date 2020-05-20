import Symphony from 'symphony-api-client-node'
import fetch from 'node-fetch'

const regex = /^\/g .*/

const onMessage = (messages: Symphony.Message[]): void => {
  messages.forEach((message) => {
    if (regex.test(message.messageText)) {
      const searchQuery = message.messageText.split('/g ')[1]
      fetch()
      Symphony.sendMessage(message.stream.streamId, searchQuery, undefined, Symphony.MESSAGEML_FORMAT)
      return
    }
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
