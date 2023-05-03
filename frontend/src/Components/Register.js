import { React, useState, useEffect } from 'react'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../UserAction/UserAction'
import { useNavigate,Link } from 'react-router-dom'
import Loder from './Loder'


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ name: "", email: "", password: "", cpassword: "" })
  const {  isAuthenticated, error,loading } = useSelector((state) => state.user);

  const Onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const { email, password, name, cpassword } = data;
  const onsubmit = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password, cpassword))
  }
  console.log("regfister")

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if(error){
      alert(error)
    }

  }, [dispatch, isAuthenticated, navigate, error])

  return (
  <>
  {loading?<Loder/>:
    <div className="register_form">
      <div className="form2">
        <h3>Register Here</h3>
        <form >
          <input type="text" name='name' onChange={Onchange} placeholder="Enter Your Name" />

          <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" />
          <input type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" />
          <input type="password" name='cpassword' onChange={Onchange} placeholder="Confirm Password" />
        </form>
        <button onClick={onsubmit}>Submit</button><Link className='signin' to="/login">Already registerd</Link>
      </div>
    </div>}
  </>
  )
}

export default Register