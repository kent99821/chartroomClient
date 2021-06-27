//连接客户端io
import io from 'socket.io-client'
// 连接服务器
const socket=io('ws://localhost:5000')
// 发送消息
socket.emit('sendMsg',{name:'abc'})
console.log('客户端向服务器发送消息',{name:'abc'})

socket.on('receviceMsg',function(data){
console.log("接收到服务器的消息",data)
})

