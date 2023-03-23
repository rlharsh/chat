import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import { useNavigate } from 'react-router-dom';
import uuid4 from 'uuid4';

/* Import the primary Stylesheet */
import '../../assets/css/Home.css';

const Home = ({socket}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const createOrJoin = () => {
    if (userName != '' && roomCode === '') {
      const roomID = uuid4();
      socket.emit('createRoom', { name: userName, roomId: roomID });
      socket.emit('joinRoom', { name: userName, id: roomID });
    }
    if (roomCode !== '' && userName != '') {
      socket.emit('joinRoom', { name: userName, id: roomCode });
    }
  }

  useEffect(() => {
    socket.on('roomJoined', (data) => {
      socket.username = userName;
      navigate(`/chat/${data.id}`)
    });
  }, [socket]);

  return (
    <div id='home' className='home-wrapper'>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className='Modal'
        overlayClassName='Overlay'
        contentLabel='Example Modal'
      >

        <div className='modal-wrapper'>
          <h2>Start Chatting</h2>
          <p>
            To <span className='highlight'>host</span> a chatroom ensure you <span className='highlight'>leave the room code blank</span>. In order
            to join a chat that is already in progress you will need to ensure
            that you enter a room code. <br /> <br />
            It is important to note that conversations within the chatroom are
            not saved, meaning once the chat has concluded the information contained
            therein will be lost.
          </p>
          <label htmlFor="user">Username:</label>
          <input type="text" name='user' id='user' onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="code">Room Code:</label>
          <input type="text" name='code' id='code' onChange={(e) => setRoomCode(e.target.value)} />
          <button className='button' type='button' onClick={ createOrJoin }>Start Chatting Now</button>
        </div>

      </Modal>

        <div className='home-wrapper__banner'>
            <div className='home-wrapper__banner__internal'>
                <h1>Chatnonymous</h1>
                <p>Click to host or join a chat anonymously.</p>
                <div className='home-wrapper__banner__internal__button-wrapper'>
                    <button onClick={openModal} className='button'><i className="fa-regular fa-message"></i> Start Chatting</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home