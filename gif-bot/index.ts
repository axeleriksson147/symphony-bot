import Symphony from 'symphony-api-client-node'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const regex = /^\/g .*/

const onMessage = (messages: Symphony.Message[]): void => {
  messages.forEach(async (message) => {
    if (regex.test(message.messageText)) {
      const searchQuery = message.messageText.split('/g ')[1]
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${searchQuery}`)
      const body = await response.json()
      const gifUrl = body.data.fixed_width_downsampled_url
      await Symphony.sendMessage(message.stream.streamId, `<img src="${gifUrl}"/>`, undefined, Symphony.MESSAGEML_FORMAT)
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
