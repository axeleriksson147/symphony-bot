declare module 'symphony-api-client-node' {
  function getDatafeedEventsService(value: any): any
  function initBot(path: string): Promise<any>
  function setDebugMode(value: boolean): void
  function sendMessage(one: any, two: any, three: any, four: any): void
  
  const MESSAGEML_FORMAT = 'test'
}