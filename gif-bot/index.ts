import Symphony from 'symphony-api-client-node'
Symphony.setDebugMode(true)

const botHearsSomething = (event: any, messages: any) => {
  messages.forEach((message: any, index: any) => {
    let reply_message = 'Hello ' + message.user.firstName + ', hope you are doing well!!'
    Symphony.sendMessage(message.stream.streamId, reply_message, null, Symphony.MESSAGEML_FORMAT)
  })
}

Symphony.initBot(__dirname + '/config.json')
  .then((symAuth: any) => {
    Symphony.getDatafeedEventsService(botHearsSomething)
  })
