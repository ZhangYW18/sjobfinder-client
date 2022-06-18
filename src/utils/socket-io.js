import io from 'socket.io-client'

export const socket = io('ws://localhost:4000', { transports : ['websocket'] })
console.log('socketIO init success')

// When socket received data from server
socket.on('receiveMsg', function (data) {
  dispatchEvent()
  console.log('Received data from server: ', data)
})

export const sendMessage = (from, to, msg, uuid) => {
  socket.emit('sendMsg', {from, to, msg, uuid});
}

