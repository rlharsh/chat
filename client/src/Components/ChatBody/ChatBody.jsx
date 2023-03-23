import React, { useEffect, useRef, useState } from 'react';
import uuid4 from 'uuid4';

import CryptoJS from 'crypto-js';

/* Import the primary Stylesheet */
import '../../assets/css/ChatBody.css';

const ChatBody = (props) => {

    const lastMessageRef = useRef(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [props.messages]);

      const Message = ({ message, isOutgoing }) => {
        const key = React.useMemo(() => uuid4(), []);
        const timestamp = new Date(message.timestamp).toLocaleString();
      
        const icon = isOutgoing ? null : (
          <div className='incoming-message__icon'>
            { message.name.split(' ').map(word => word.charAt(0)).splice(0, 2).join('') }
          </div>
        );

        const bytes = CryptoJS.AES.decrypt(message.text, props.id);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        const textWithLinks = plainText.replace(
            /(https?:\/\/[^\s]+)/g,
            (match) => `<a href="${match}" target="_blank">${match}</a>`
          );
      
        return (
          <div key={key} className={isOutgoing ? 'outgoing-message' : 'incoming-message'}>
            {icon}
            <div className={`${isOutgoing ? 'outgoing' : 'incoming'}-message__message-text`}>
            <p dangerouslySetInnerHTML={{__html: textWithLinks}}></p>
                <div className={`${isOutgoing ? 'outgoing' : 'incoming'}-message__timestamp`}>
                    <p>{timestamp}</p>
                </div>
            </div>
          </div>
        );
      };
      
      const renderMessages = () => {
        return props.messages.map(message => (
          <Message
            key={uuid4()}
            message={message}
            isOutgoing={message.name === props.socket.username}
          />
        ));
      };
      

    return (
    <div className='chat-messages'>
        { renderMessages() }
        <div ref={lastMessageRef}></div>
    </div>
    )
}

export default ChatBody