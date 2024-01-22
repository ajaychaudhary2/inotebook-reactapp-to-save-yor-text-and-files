import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Signup = (props) => {
  const [data, setData] = useState({ email: "", password: "",cpassword:"",name:"" })
  let history =  useHistory()
  const handlesubmit = async (e) => {
    e.preventDefault()
   const {name,email,password}=data
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",


      },

      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success){
      //save tha auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history.push("/")
      
      
    }
    else{
     alert('kch nhiiiii hai bhai')
    }


  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className='container margin'>
        <h1 className='cl2 my-4'>SignUp to inotebook</h1>
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  onChange={onChange} name="name"   aria-describedby="emailHelp" required minLength={3}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  onChange={onChange}   name="email" aria-describedby="emailHelp" required/>
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  onChange={onChange} name="password"  id="password" required minLength={6}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
    <input type="cpassword" className="form-control"  onChange={onChange}   name="cpassword" id="cpassword" minLength={6} required/>
  </div>
  
  <button type="submit" className="btn btnclr">SignUp</button>
</form>
    </div>
  )
}

export default Signup
