import React from 'react'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { Logout, getAllnotes } from '../UserAction/UserAction'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { allnotes_fail } from '../Constants/Constants'

const Navbar = () => {

  const navigate = useNavigate()
  const Toogle = () => {
    let toogle_btn_icon = document.querySelector('.bar i');
    let dropdown = document.querySelector('.sidebar')

    dropdown.classList.toggle('open')
    const isOpen = dropdown.classList.contains('open');
    toogle_btn_icon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
  }

  const dispatch = useDispatch()
  const { isAuthenticated, error } = useSelector(state => state.user)

  const logOUt = () => {

    dispatch(Logout())
    dispatch({ type: allnotes_fail })

  }
  const getNOte = () => {
    dispatch(getAllnotes());
   
    
  }
  useEffect(() => {
    // if (error) {
    //   alert(error)
    // }

    // if(!isAuthenticated){
    //   navigate('/login')
    // }
     
    
  }, [error, isAuthenticated, navigate])


  return (
    <>

      <header>
        <div className="navbar">

          <div className="logo"><Link to="/">Coder sidhant</Link></div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Profile</Link></li>
            <li><Link onClick={getNOte} to="/notes">Notes</Link></li>
            <li><Link to="contact">Contact</Link></li>
            <li><Link to="feedback">Feedback</Link></li>
          </ul>
          {isAuthenticated ? <Link onClick={logOUt} className="start" to="">Logout</Link> : <Link className="start" to="/login">Get Started</Link>}
          <div onClick={Toogle} className="bar">
            <i className="fa-solid fa-bars" />
          </div>
        </div>

      </header>
      <div className="sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link onClick={getNOte} to="/notes">Notes</Link></li>
          <li><Link to="contact">Contact</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          {isAuthenticated ? <li> <Link onClick={logOUt} className="start" to="">Logout</Link></li> : <li><Link className="start" to="/login">Get Started </Link></li>}

        </ul>
      </div>
    </>
  )
}


export default Navbar