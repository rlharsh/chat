import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import doorbell from "./doorbell.mp3";
import notification from "./notification.mp3";

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

    const newuser = new Audio(notification);
    const notify = new Audio(doorbell);

    useEffect(() => {
        const handleNewMessage = (data) => {
            newuser.loop = false;
            newuser.play();
            setMessages(prevMessages => [...prevMessages, data]);
        };
        socket.on('messageResponse', handleNewMessage);
        return () => {
            socket.off('messageResponse', handleNewMessage);
        };
    }, [socket, newuser]);

    useEffect(() => {
        const handleTypingStatus = (data) => {
            setTypingStatus(data.message);
        };
        socket.on("typingResponse", handleTypingStatus);
        return () => {
            socket.off("typingResponse", handleTypingStatus);
        };
    }, [socket]);

    const handleRoomEntered = useCallback(() => {
        socket.emit('roomEntered', {
            name: socket.username,
            id: id
        })
    }, [socket, id]);

    useEffect(() => {
        handleRoomEntered();
    }, [handleRoomEntered]);

    useEffect(() => {
        const handleRoomEnteredResponse = (data) => {
            setUsers(data.users);
            notify.loop = false;
            notify.play();
        };
        socket.on('roomEntered', handleRoomEnteredResponse);
        return () => {
            socket.off('roomEntered', handleRoomEnteredResponse);
        };
    }, [socket]);

    useEffect(() => {
        const handleRoomJoined = (message) => {
            setUsers(message.users);
        };
        socket.on('roomJoined', handleRoomJoined);
        return () => {
            socket.off('roomJoined', handleRoomJoined);
        };
    }, [socket]);

    useEffect(() => {
        const handleUserLeft = (message) => {
            // Handle user left event
        };
        socket.on('userLeft', handleUserLeft);
        return () => {
            socket.off('userLeft', handleUserLeft);
        };
    }, [socket]);

    const renderHeader = useCallback(() => {
        return(
            <ChatHeader socket={socket} users={users} id={id}/>
        )
    }, [socket, users, id]);

    const renderBody = useCallback(() => {
        return(
            <ChatBody socket={socket} users={users} id={id} messages={messages} />
        )
    }, [socket, users, id, messages]);

    const renderFooter = useCallback(() => {
        return(
            <ChatFooter socket={socket} users={users} id={id} typingStatus={typingStatus} />
        )
    }, [socket, users, id, typingStatus]);

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

export default Chat;