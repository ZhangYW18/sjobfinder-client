import io from 'socket.io-client'
import {addMessage} from "../redux/reducers/chat";
import store from "../index";
import {Toast} from "antd-mobile";

export const socket = io('ws://localhost:4000', { transports : ['websocket'] })
console.log('socketIO init success')

// When socket received data from server
socket.on('receiveMsg', function (resp) {
  console.log('Received data from server: ', resp)
  if (resp.code === 0)
    store.dispatch(addMessage({data: resp.data}));
  else
    Toast.show(`Send message error: ${resp.msg}`);
})

// Send message to server
export const sendMessage = (from, to, msg) => {
  try {
    socket.emit('sendMsg', {from, to, msg});
  } catch (err) {
    Toast.show(`Send message "${msg}" error`);
  }
}

