import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Import the primary Stylesheet */
import './assets/css/app.css';

/* Import the pages needed to run the Application */
import Home from './Pages/Home/Home';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
