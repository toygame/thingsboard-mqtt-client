const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://thingsboard.cloud', {
  username: 'Insert your token here!!!',
})

client.on('connect', function () {
  console.log('connected')
  client.subscribe('v1/devices/me/rpc/request/+')
})

client.on('message', function (topic, message) {
  console.log('request.topic: ' + topic)
  console.log('request.body: ' + message.toString())
  const requestId = topic.slice('v1/devices/me/rpc/request/'.length)
  //client acts as an echo service
  client.publish('v1/devices/me/rpc/response/' + requestId, message)
})
