import express from 'express'
import {fileURLToPath} from 'node:url'
import http from 'http'
import {join, dirname} from 'node:path'
import {Server} from 'socket.io'


const app = express()
const server = http.createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.get('/',(req,res)=>res.sendFile(join(__dirname,'index.html')))

io.on('connection', (client)=>{
    console.log(`User ${client.id} ✅`)

    // client.emit('my_message','Message from the server side!')
    client.on('my_message',(message)=>console.log(message))

    client.on('disconnect',()=>{
        console.log(`User ${client.id} ❌`)
    })
})

const PORT=5000
server.listen(PORT,()=>console.log(`Server on port ${PORT}`))