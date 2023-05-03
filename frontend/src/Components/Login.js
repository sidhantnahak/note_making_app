import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState, useEffect } from 'react'
import { getAllnotes, login } from '../UserAction/UserAction';
import { useDispatch, useSelector } from 'react-redux'
import Loder from './Loder';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, loading, isAuthenticated, error } = useSelector((state) => state.user);


    const [data, setData] = useState({ email: "", password: "" })
    const { email, password } = data;

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const OnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllnotes())
            navigate("/");
        }
        if(error){
            alert(error)
        }
    }, [dispatch, navigate, isAuthenticated, loading, error, user])
    return (
        <>
            {loading ? <Loder /> :
                <div className="login_container">
                    <div className="form">
                        <h3 className='login_heading'>Login Here</h3>
                        <form>
                            <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" />
                            <input type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" />

                        </form>
                        <button onClick={OnSubmit}>Submit</button><Link to="/register">Create New Account</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Login