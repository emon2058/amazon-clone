import React, {useState} from 'react';
import './Login.css';
import {Link,useHistory} from 'react-router-dom';
import {auth} from './firebase';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login(){

  {/*using React Hooks to save history*/}
  const history=useHistory();
  {/*
    declaring state variable using useState() hooks.
    first we initail email is null when user type their
    email address then setEmail took user's email address and
    set this to the email that is empty.
  */}
  const [email,setEmail]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [password,setPassword]=useState('');

  {/*Sign In with firebase*/}
  const signIn = e =>{
    {/*When click singIn button this page update without refresh*/}
    e.preventDefault();
    {/*It matchers the email and password that is saved in firebase.*/}
    auth.signInWithEmailAndPassword(email,password).then(auth=>{
      {/*go to root path or homepage*/}
        history.push('/')
      })
        .catch(error => alert(error.message))
  }

  const hideOtherButtons = e =>{
  e.preventDefault();
  document.getElementById('firebaseui_container').style.visibility="hidden";
  document.getElementById('Password').style.visibility="hidden";
  document.getElementById('password').style.visibility="hidden";
  document.getElementById('signIn').style.visibility="hidden";
  document.getElementById('createNewAccount').style.visibility="hidden";
  document.getElementById('hide').style.display="none";
  document.getElementById('resetPassword').style.visibility="visible";
}

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // signInSuccessUrl:'/',
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  const resetPassword = e =>{
      e.preventDefault();

      // [START sendpasswordemail]
      auth.sendPasswordResetEmail(email).then(auth => {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  }

  return(
    <div className="login">
      <Link to="/">
        <img className="login_logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"/>
      </Link>
      <div className="login_conatainer">
        <h1>Sign-in</h1>
        <form>
          <h4>E-mail</h4>
          <input type="text" id="email" value={email}
          onChange={event=>setEmail(event.target.value)} />
          <h4 id="Password">Password</h4>
          <input type="password" id="password" value={password}
          onChange={event=>setPassword(event.target.value)} />
          <button id="resetPassword" className="resetPassword" onClick={resetPassword} style={{visibility:"hidden"}}>Reset Your Password</button>
          <button id="signIn" className="sign_in" onClick={signIn}>Sign-in</button>
          <Link to="/signup" id="createNewAccount">
            <button  className="login_new_account">Create New Account</button>
          </Link>
          <button id="hide" className="resetPassword" onClick={hideOtherButtons}>Reset Your Password</button>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
            />
        </form>
      </div>
    </div>
  )
}

export default Login;
