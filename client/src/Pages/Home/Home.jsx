import React, { useState } from 'react';
import Modal from 'react-modal';

/* Import the primary Stylesheet */
import '../../assets/css/Home.css';

const Home = () => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement('#root');
  
  return (
    <div id='home' className='home-wrapper'>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className='Modal'
        overlayClassName='Overlay'
      >

      <div className='modal-wrapper'>
        <h2>Start Chatting</h2>
        <p>
          To host a chatroom ensure you leave the room code blank. In order
          to join a chat that is already in progress you will need to ensure
          that you enter a room code. <br /> <br />
          It is important to note that conversations within the chatroom are
          not saved, meaning once the chat has concluded the information contained
          therein will be lost.
        </p>
        <label htmlFor="user">Username:</label>
        <input type="text" name='user' id='user' />
        <label htmlFor="code">Room Code:</label>
        <input type="text" name='code' id='code' />
        <button className='button'>Start Chatting Now</button>
      </div>

      </Modal>

        <div className='home-wrapper__banner'>
            <div className='home-wrapper__banner__internal'>
                <h1>Chatnonymous</h1>
                <p>Click to host or join a chat anonymously.</p>
                <div className='home-wrapper__banner__internal__button-wrapper'>
                    <button onClick={openModal} className='button'><i class="fa-regular fa-message"></i> Start Chatting</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home