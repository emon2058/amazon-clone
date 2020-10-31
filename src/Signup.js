import React, {useState} from 'react';
import './Signup.css';
import {Link,useHistory} from 'react-router-dom';
import {auth} from './firebase';

function Signup(){
  {/*using React Hooks to save history*/}
  const history=useHistory();
  {/*
    declaring state variable using useState() hooks.
    first we initail email is null when user type their
    email address then setEmail took user's email address and
    set this to the email that is empty.
    */}
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');

  {/*Sign Up with firebase*/}
  const newAccount = e =>{
    {/*When click singIn button this page update without refresh*/}
    e.preventDefault();
    {/*create new accoun */}
    auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
      if(auth){
        {/*go to root path or homepage*/}
        history.push('/')
      }
    })
    .catch(error=>alert(error.message));
  }
  const sendEmail= e => {
    e.preventDefault();
    function sendEmailVerification(){
    // [START sendemailverification]
    auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
      });
    // [END sendemailverification]
    }
  }
  return(
    <div className="signup">
      <Link to="/">
        <img className="signup_logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"/>
      </Link>
      <div className="signup_conatainer">
        <h1>Sign-up</h1>
        <form>
          <h4>Name</h4>
          <input type="text" value={name}
            onChange={event=>setName(event.target.value)}/>
          <h4>Phone Number</h4>
          <input type="text" name="phoneNumber" />
          <h4>E-mail</h4>
          <input type="text" value={email}
            onChange={event=>setEmail(event.target.value)} />
          <h4>Password</h4>
          <input type="password" value={password}
            onChange={event=>setPassword(event.target.value)} />
          <Link to="/login">
            <button >Sign-in</button>
          </Link>
          <button onClick={newAccount} className="signup_new_account">Create New Account</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
