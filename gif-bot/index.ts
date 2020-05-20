import Symphony from 'symphony-api-client-node'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const regex = /^\/g .*/

const onMessage = (messages: Symphony.Message[]): void => {
  messages.forEach(async (message) => {
    if (regex.test(message.messageText)) {
      const searchQuery = message.messageText.split('/g ')[1]
      const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${searchQuery}`)
      const giphyBody = await giphyResponse.json()
      const gifUrl = giphyBody?.data.fixed_height_downsampled_url
      const response = gifUrl
        ? Symphony.sendMessage(message.stream.streamId, `<img src="${gifUrl}"/>`, undefined, Symphony.MESSAGEML_FORMAT)
        : Symphony.sendMessage(message.stream.streamId, 'No GIF found <emoji shortcode="cry"></emoji>', undefined, Symphony.MESSAGEML_FORMAT)

      if ((response as Symphony.SendMessageErrorResponse).code === 400) {
        console.log(response)
      }
    }
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
