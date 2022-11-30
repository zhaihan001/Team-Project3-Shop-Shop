import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../contexts/UserContext';
import Auth from '../utils/auth';

function Signup() {
  const { newUser } = useUserContext();

  const [userForm, setUserForm] = useState({username: '', email: '', password: '', confirmPassword: ''})
  const handleFormChange = (e) => {
    const {name, value} = e.target
    setUserForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitNewUserForm = async (e) => {
    e.preventDefault();
    try {
      console.log("hit");
      const { data } = await newUser({
        variables: {
          username: userForm.username,
          email: userForm.email,
          password: userForm.password
        }
      })
      console.log(data);

      Auth.login(data.addUser.token);

      // navigate to my shop or user account page after

      return data
      
    } catch (error) {
      return error
    }
  }

  return (
    <Container>
    <SignupForm>
      <form onSubmit={submitNewUserForm}>
      <h2>Signup</h2>
      <label htmlFor='name'>Username:</label>
      <input value={userForm.username} onChange={handleFormChange} type='text' name='username' id='username'/>
      <label htmlFor='email'>Email:</label>
      <input value={userForm.email} onChange={handleFormChange} type='email' name='email' id='email'/>
      <label htmlFor='password'>Password:</label>
      <input value={userForm.password} onChange={handleFormChange} type='password' name='password' id='password'/>
      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <input value={userForm.confirmPassword} onChange={handleFormChange} type='password' name='confirmPassword' id='confirmPassword' style={{border: userForm.password !== userForm.confirmPassword ? "2px solid red" : ""}}/>
      {userForm.password !== userForm.confirmPassword && <small>Passwords do not match.</small>}
      <input type="submit" value="Signup" />
      <a href="/login">Already have an account? Login Here</a>
      </form>
    </SignupForm>
  </Container>
  )
}

export default Signup

const Container = styled.div`
  padding-top: 3vw;

  h2 {
    font-size: 40px;
    text-decoration: underline;
    color: black;
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
    margin-bottom: 5vh;
 }
    
`

const SignupForm = styled.div`

display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
  padding: 60px;

  input {
    width: 300px;
    min-height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(123, 145, 171);
    &:focus {
      border: 2px solid rgb(144, 57, 57);
      }
    }
  }

  label {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: black;
  }

  small {
    color: red;
  }

  // Signup BUTTON STYLES

  input[type="submit"] {
    padding: 20px;
    margin-top: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    background: black;
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      border-color: rgba(249, 249, 249, 0.8);
      background: grey;
      color: black;
    }
  }
  
  // Login link

  a {
    padding-top: 20px;
  }
  
  `