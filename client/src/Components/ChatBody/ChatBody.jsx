import React, { useEffect, useRef, useState } from 'react';
import uuid4 from 'uuid4';

/* Import the primary Stylesheet */
import '../../assets/css/ChatBody.css';

const ChatBody = (props) => {

    const lastMessageRef = useRef(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [props.messages]);

    const renderMessages = () => {
        return(
            props.messages.map(message => (
                message.name === props.socket.username ? (
                    <div key={uuid4()} className='outgoing-message'>
                        <div className='outgoing-message__message-text'>
                            <p>{ message.text }</p>
                        </div>
                        <div className='outgoing-message__timestamp'>
                            { 
                                <p>{new Date(message.timestamp).toLocaleString()}</p>
                            }
                        </div>
                    </div>
                ) : (
                    <div key={uuid4()} className='incoming-message'>
                        <div className='incoming-message__icon'>
                            {
                                message.name.split(' ').map(word => word.charAt(0))
                                .splice(0, 2)
                                .join('')
                            }
                        </div>
                        <div className='incoming-message__message-text'>
                            <p>{ message.text }</p>
                        </div>
                        <div className='incoming-message__timestamp'>
                            { 
                                <p>{new Date(message.timestamp).toLocaleString()}</p>
                            }
                        </div>
                    </div>
                )

            ))
        )
    };

    return (
    <div className='chat-messages'>
        { renderMessages() }
        <div ref={lastMessageRef}></div>
    </div>
    )
}

export default ChatBody