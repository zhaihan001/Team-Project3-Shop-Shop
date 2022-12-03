import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Auth from '../utils/auth'

export default function SignInPage() {
    const [showSignUp, setShowSignUp] = useState(false)
    
    if(Auth.loggedIn()){
        return <Navigate to="/" />
    }

  return (
    <>
        {!showSignUp ? <Login setShowSignUp={setShowSignUp} /> : <Signup setShowSignUp={setShowSignUp} />}
    </>
  )
}
