import Symphony from 'symphony-api-client-node'
import { Message } from './types/symphony-api-client-node'

const onMessage = (messages: Message[]) => {
  messages.forEach((message) => {
    console.log(
      'The BOT heard "' + message.messageText + '" from ' + message.user.displayName
    )
  })
}

const onError = error => {
  console.error('Error reading data feed', error)
}

Symphony.initBot(__dirname + '/config.json')
.then(() => {
  Symphony.getDatafeedEventsService({ onMessage, onError })
})
.fail(err => {
  console.error(err)
})
