import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='home-container'>

        <div className="get_started">
          <h2>
           To Make Your First Note <Link to='/notes'>Click here</Link> 
          </h2>
        </div>
       
      </div>
    </>
  )
}

export default Home