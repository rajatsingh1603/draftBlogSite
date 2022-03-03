import React, { useState } from 'react'
import './register.css'
import axios from "axios"
import { useHistory } from 'react-router-dom'

function Register() {

    const history = useHistory();

    const [user,setUser] = useState({
        name : "",
        email : "",
        password : "",
        reEnterPassword : ""
    })

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const register = () =>{
        const {name,email,password,reEnterPassword} = user;
        if(name && email && (password === reEnterPassword)){
            
            axios.post("http://localhost:9002/register",user)
            .then(res => {
                alert(res.data.message)
                history.push("/login")
            });
        }
        else{
            alert("Invalid Input");
        }
        
    }
  return (
    <div className='register'>
    <h1>Register</h1>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Enter your Name" ></input>
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder='Enter your e-mail'></input>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='password'></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} placeholder='re-enter password'></input>
        <div className='button' onClick={register}>Register</div>
        <div>or</div>
        <div className='button' onClick={()=>{history.push("/login")}}>Login</div>

    </div>
  )
}

export default Register