let app = require('express')()
let http = require('http').Server(app)
// let fs = require('fs')
let io = require('socket.io')(http)

// var i = 0 // 当前在线人数
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    // 接收从前端传过来的聊天信息
    socket.on('chat', function(msg) {
        console.log(msg)
        io.emit('chat', {
            name: socket.nickName,
            msg: msg
        })
    })
    // i++
    // console.log('有' + i + '个用户连接了')

    // 当用户进入聊天室的信息
    socket.on('join', (name) => {
        socket.nickName = name
        io.emit('join', {
            name: name,
            state: '进入'
        })
    })
})

http.listen(4000, '127.0.0.1', () => {
    console.log('app start port 4000......')
})
