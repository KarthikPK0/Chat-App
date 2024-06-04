import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, addMessage } from '../redux/loginSlice'
import { io } from 'socket.io-client'
import '../App.css'
import "./Login.css";


const socket = io("https://chat-app-server-8huh.onrender.com");


const Login = () => {
    const [message, setMessage] = useState("");
    const [inputUsername, setInputUsername] = useState("");
    const dispatch = useDispatch();
    const username = useSelector((state) => state.login.username);
    const messages = useSelector((state) => state.login.messages);
  
    useEffect(() => {
      socket.on("chat message", (msg) => {
        dispatch(addMessage(msg));
      });
  
      return () => {
        socket.off("chat message");
      };
    }, [dispatch]);
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (message) {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const timestamp = `${formattedHours}:${formattedMinutes} ${ampm}`;
  
        socket.emit("chat message", { username, message, timestamp });
        setMessage("");
      }
    };
  
    const handleUsernameSubmit = (e) => {
      e.preventDefault();
      if (inputUsername) {
        dispatch(setUsername(inputUsername));
      }
    };
  return (
   <>
   
   <div>

   </div>
    
       <div style={{paddingTop:'80px'}} className="app">

    <div className="heading">
      <h1>
        <span style={{ color: "  #004242" }}>LiteChat </span>Chat App
      </h1>
    </div>
    {!username ? (
      <div className="overlay">
        <div className="username-dialog">
          <h1>
            Welcome to{" "}
            <span style={{ color: "#004242" }}>LiteChat </span>Chat App
          </h1>
          <h3>Enter Your Nickname</h3>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              className="username-input"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              placeholder="Enter your nickname"
            />
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    ) : (
      <>
        <ul id="messages">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={msg.username === username ? "user" : "other"}
            >
              <i>
                <span className='text-warning'>{msg.username}</span>
              </i>
              👀<br />
              <span>{msg.message}</span>
              <br />
              <div className="timestamp">{msg.timestamp}</div>
            </li>
          ))}
        </ul>
        <form id="form" onSubmit={handleSendMessage}>
          <input
            id="input"
            autoComplete="off"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button id="send">Send</button>
        </form>
      </>
    )}
  </div>
   </>
  )
}

export default Login
