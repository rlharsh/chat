import React, { useState } from 'react';
import uuid4 from 'uuid4';

import CryptoJS from 'crypto-js';

/* Import the primary Stylesheet */
import '../../assets/css/ChatFooter.css';

const ChatFooter = (props) => {

    const [message, setMessage] = useState('');
    

    const sendMessage = () => {
        const now = new Date();
        const timestamp = now.getTime();

        const cipherText = CryptoJS.AES.encrypt(message, props.id).toString();

        props.socket.emit('message',
            {
                text: cipherText,
                name: props.socket.username,
                id: props.id,
                socketID: props.socket.id,
                timestamp: timestamp
            }
        );

        props.socket.emit('typing', {
            id: props.id,
            message: ``
          });
    }

    const renderTypingStatus = () => {
        return(
            <p>{props.typingStatus}</p>
        )
    }

    let timeoutId;

    const handleTyping = (e) => {
        if (e.key === "Enter") {
            sendMessage();
            setMessage("");
        }

        props.socket.emit('typing', {
          id: props.id,
          message: `${props.socket.username} is typing...`
        });
      
        clearTimeout(timeoutId); // clear the previous timeout (if any)
        timeoutId = setTimeout(() => {
          props.socket.emit('typing', {
            id: props.id,
            message: ``
          });
        }, 10000); // wait for 30 seconds before emitting a stopTyping message
      };

    return (
        <div className='chat-footer'>
            <div>
                { renderTypingStatus() }
            </div>
            <div className='inputs'>
                <input value={message} type="text" onChange={(e) => {
                    setMessage(e.target.value);
                }} onKeyDown={handleTyping} />
                <button className='button-send' type='button' onClick={ sendMessage }><i className="fa-regular fa-paper-plane"></i></button>
            </div>
        </div>
    )
}

export default ChatFooter