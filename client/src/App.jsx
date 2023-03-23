import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://192.168.1.26:4000');

/* Import the primary Stylesheet */
import './assets/css/app.css';
import Chat from './Pages/Chat/Chat';

/* Import the pages needed to run the Application */
import Home from './Pages/Home/Home';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home socket={socket} /> } />
          <Route path='/chat/:id' element={ <Chat socket={socket} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App