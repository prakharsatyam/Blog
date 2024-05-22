import React from 'react'
import { useState,useEffect } from 'react'
function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
   useEffect(() => {
     
   
     
   }, [])
   
  
    return (
    <div>
        <h2>Login</h2>
        <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} placeholder='user'/>
        {'                '}
        <input type="text" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder='Password'/>
    </div>
  )
}

export default Login