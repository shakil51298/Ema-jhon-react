import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }



  return (
    <div style={{ textAlign: 'center' }} className="mt-3 container w-50">
      <p style={{ color: 'red' }}>{user.error}</p>
      { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        {newUser && <input className="form-control" name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input className="form-control" type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
        <br />
        <input className="form-control" type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
          <label htmlFor="newUser" class="form-check-label" for="exampleCheck1">New User Sign up</label>
        </div>
        <input className="btn btn-outline-warning" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <br />
      {user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button className="btn btn-outline-warning" onClick={googleSignIn}>Sign In With google</button>
      }
      <div className="">
        <button className="mt-3 btn btn-outline-warning" onClick={fbSignIn}>Sign in using Facebook</button>
      </div>
    </div>
  );
}

export default Login;
