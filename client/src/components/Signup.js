import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../contexts/UserContext';
import Auth from '../utils/auth';
import { Palette } from './Palette';
import {Navigate, useLocation} from "react-router-dom";


function Signup({setShowSignUp}) {
  const { newUser } = useUserContext();
  const location = useLocation();

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitNewUserForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await newUser({
        variables: {
          username: userForm.username,
          email: userForm.email,
          password: userForm.password,
        },
      });

      Auth.login(data.addUser.token);

      // navigate to my shop or user account page after
      window.location.assign(`${location.state.previousUrl || '/'}`);

    } catch (error) {
      return error;
    }
  };

  return (
    <Container>
      <SignupForm>
        <form onSubmit={submitNewUserForm}>

          <h2>Signup</h2>
          <label htmlFor="name">Username:</label>
          <input
            value={userForm.username}
            onChange={handleFormChange}
            type="text"
            name="username"
            id="username"
          />
          <label htmlFor="email">Email:</label>
          <input
            value={userForm.email}
            onChange={handleFormChange}
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={userForm.password}
            onChange={handleFormChange}
            type="password"
            name="password"
            id="password"
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            value={userForm.confirmPassword}
            onChange={handleFormChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            style={{
              border:
                userForm.password !== userForm.confirmPassword
                  ? "2px solid red"
                  : "",
            }}
          />
          {userForm.password !== userForm.confirmPassword && (
            <small>Passwords do not match.</small>
          )}
          <input type="submit" value="Signup" />

            {/* Login Button */}
          <button onClick={() => setShowSignUp(prev => !prev)}>Already have an account? Login Here</button>

        </form>
      </SignupForm>
    </Container>
  );
}

export default Signup;

const Container = styled.div`
  padding-top: 3vw;
  overflow-x: hidden;
  position: relative;
  background-image: url("/images/strokes.png");
  background-size: cover;

  h2 {
    font-size: 40px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
    margin-bottom: 5vh;
  }
`;

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
    border: 1px solid ${Palette.brown};
    &:focus {
      border: 2px solid ${Palette.red};
      }
    }
  }

  label {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${Palette.blue};
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
    background: ${Palette.blue};
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      border-color: rgba(249, 249, 249, 0.8);
      background: ${Palette.blue};
      color: white;
    }
  }

  // Login link

  button {
    background: none;
    padding-top: 20px;
    color: ${Palette.red};
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
  
`;
