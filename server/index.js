import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

app.use(cors())

io.on('connection',(socket)=>{
    console.log('User connected ✅ :', socket.id)

    socket.on('message',(msg)=>{
        io.emit('message',msg)
    })

    socket.on('disconnect',()=>console.log('User disconnected ❌ :',socket.id))
})


const PORT = 5000
server.listen(PORT, ()=>console.log(`Server on port ${PORT}`))