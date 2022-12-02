import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

export default function SignInPage() {
    const [showSignUp, setShowSignUp] = useState(false)

  return (
    <>
        {!showSignUp ? <Login setShowSignUp={setShowSignUp} /> : <Signup setShowSignUp={setShowSignUp} />}
    </>
  )
}
