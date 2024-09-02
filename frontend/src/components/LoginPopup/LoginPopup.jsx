import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import "./LoginPopup.css"

const LoginPopup = ({setShowLogin}) => {


  const { url,setToken } = useContext(StoreContext)

    const [currState,setCurrState] = useState("LogIn")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event)=>{
       const name = event.target.name;
       const value = event.target.value;
       setData(data=>({...data,[name]:value}))
    }
    
    const onLogin = async (event) =>{
      event.preventDefault()
      let newUrl = url;
      if(currState==="Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const responce = await axios.post(newUrl,data);
      if(responce.data.success){
         setToken(responce.data.token);
         localStorage.setItem("token",responce.data.token);
         setShowLogin(false)
      }
      else{
        alert(responce.data.message)  
      }
    }
   

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==="LogIn"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />

        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login In"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="LogIn"
        ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")} >Click here</span></p>
        :<p>Alredy have an Account? <span onClick={()=>setCurrState("LogIn")} >Login here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
