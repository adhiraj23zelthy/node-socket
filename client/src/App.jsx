import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'

const socket = io('http://localhost:5000')

const App = () => {
  const [messages,setMessages] = useState([])
  const [messageInput,setMessageInput] = useState('')
  useEffect(()=>{
    socket.on('message',(message)=>{
      console.log(socket.id)
      setMessages([...messages, message])
    })
    return ()=>{
      socket.off('message')
    }
  },[messages])
  const sendMessage = () =>{
    if(messageInput.trim()!==''){
      socket.emit('message', messageInput)
      setMessageInput('')
    }
  }
  return (
    <div>
      <h1>Simple Chat App 🚀</h1>
      <input type="text" placeholder='Enter message...' value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} />
      <button onClick={sendMessage}>Send ✅</button>
      <div>
        {messages.map((m,i)=>{
          return <div key={i}>{m}</div>
        })}
      </div>
    </div>
  )
}

export default App