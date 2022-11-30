import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001");
function App() {
  const [txtValue,setTxtValue] = useState('');
  const [messageReceived,setMessageReceived] = useState([]);
  useEffect(() => {
    socket.on("receive_message",(data) => {
      const newMessage = [...messageReceived];
      newMessage.push(data);
      setMessageReceived(newMessage);
    });
  },[messageReceived]);

  function handleSubmit(e){
    socket.emit("send_message",{message: txtValue});
    setTxtValue('');
  }
  return (
    <div className="App">
      <ul className='list-message'>
        {messageReceived.map((item ,index)=> (
          <li key={index}>{item.message}</li>
          ))}
      </ul>
      <input playholder="Vui lòng nhập tin nhắn"
      value={txtValue}
      onChange={(event) => {
        setTxtValue(event.target.value);
      }}
      />
      <button type="submit" onClick={() => handleSubmit()}>Gửi tin nhắn</button>
    </div>
  );
}

export default App;
