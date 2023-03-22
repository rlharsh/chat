import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Import the primary Stylesheet */
import '../../assets/css/Chat.css';

import ChatBody from '../../Components/ChatBody/ChatBody';
import ChatFooter from '../../Components/ChatFooter/ChatFooter';
import ChatHeader from '../../Components/ChatHeader/ChatHeader';

const Chat = ({socket}) => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState("");

    
        socket.on('messageResponse', data => {
            console.log(data);
            setMessages([...messages, data])
        }) 

    useEffect(()=> {
        socket.on("typingResponse", data => setTypingStatus(data.message))
        }, [socket]);
        
    useEffect(() => {
        socket.emit('roomEntered', {
            name: socket.username,
            id: id
        })
    }, [socket]);

    useEffect(() => {
        socket.on('roomEntered', data => {
            setUsers(data.users);
            console.log(data);
        })
    })

    useEffect(() => {
        const joinRoom = () => {
            //socket.emit('joinRoom', { name: socket.username, id: id })
        }

        joinRoom();
        
    }, [id, socket]);

    socket.on('roomJoined', (message) => {
        setUsers(message.users);
        console.log(message);
    });

    socket.on('userLeft', (message) => {

    });

    const renderHeader = () => {
        return(
            <ChatHeader socket={socket} users={users} id={id}/>
        )
    };

    const renderBody = () => {
        return(
            <ChatBody socket={socket} users={users} id={id} messages={messages} />
        )
    };

    const renderFooter = () => {
        return(
            <ChatFooter socket={socket} users={users} id={id} typingStatus={typingStatus} />
        )
    }

    return (
        <div className='chat'>

            { renderHeader() }
            <div className='chat__main'>
                { renderBody() }
            </div>
            { renderFooter() }

        </div>
    )
}

export default Chat