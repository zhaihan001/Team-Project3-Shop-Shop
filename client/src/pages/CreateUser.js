import React from 'react';
import SignupForm from '.../components/Signup';
import LoginForm from '.../components/Login';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function CreateUser() {
  return (
    <Tabs
      defaultActiveKey="user"
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        <LoginForm/>
      </Tab>
      <Tab eventKey="signup" title="Signup">
        <SignupForm/>
      </Tab>
      
    </Tabs>
  );
}

export default CreateUser;