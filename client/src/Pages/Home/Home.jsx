import React from 'react'

/* Import the primary Stylesheet */
import '../../assets/css/Home.css';

const Home = () => {
  return (
    <div className='home-wrapper'>
        <div className='home-wrapper__banner'>
            <div className='home-wrapper__banner__internal'>
                <h1>Chatnonymous</h1>
                <p>Click to host or join a chat anonymously.</p>
                <div className='home-wrapper__banner__internal__button-wrapper'>
                    <button className='button'>Host</button>
                    <button className='button'>Join</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home