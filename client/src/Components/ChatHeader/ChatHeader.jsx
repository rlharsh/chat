import React from 'react'

/* Import the primary Stylesheet */
import '../../assets/css/ChatHeader.css';

const ChatHeader = (props) => {

    const leaveChat = () => {
        if (props.socket.username === null) {
            console.log('null boy')
        }

        props.socket.emit('leaveChat', {
            name: props.socket.username,
            id: props.id
        });
    }

    return (
    <div className='chat-header'>
        <div className="chat-header__left">
            <h1>Chatnonymous</h1>
            <div className='chat-header__left__breadcrumbs'>
                {
                    props.users.map((user) => (
                        <div className="user-slug" key={user}>
                            <h2>{user}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='chat-header__right'>
        <button type='button' onClick={ leaveChat }><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
        <button type='button' onClick={ leaveChat }><i className="fa-regular fa-copy"></i></button>
        </div>
        
    </div>
    )
}

export default ChatHeader