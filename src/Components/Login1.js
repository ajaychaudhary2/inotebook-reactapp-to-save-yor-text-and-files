import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login1 = () => {

  const [data, setData] = useState({ email: "", password: "" })
  let history =  useHistory()
  const handlesubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        

      },

      body: JSON.stringify({ email: data.email, password: data.password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success){
      //save tha auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history.push("/");
    
      
    }
    else{
    alert("kchnhi")
    }


  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (

    <div className="container margin">
      <h1 className='cl2 my-4'>Login to inotebook</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3 clr2">
          <label htmlFor="email" className=" clr2 form-label">Email address</label>
          <input type="email" className="form-control" value={data.email} id="email" onChange={onChange} aria-describedby="emailHelp" name='email' />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={data.password} />
        </div>


        <button type="submit" className="btn btnclr">Submit</button>
      </form></div>
  )
}

export default Login1
