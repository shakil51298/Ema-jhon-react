
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import { createUserWithEmailAndPassword, handleFacebook, handleGoogleSignIn, handleSignOut, initilizeLogInFrameWork, signInWithEmailAndPassword } from './LoginManager';

function LogIn() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isLogedIn: false,
    email: '',
    name: '',
    emailStutus: 'non-verified',
    photo: '',
  })
  initilizeLogInFrameWork()
  const [massage, setMassage] = useState({
    massage: ""
  })
  // CONTEXT API
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then(res => {
     handleRespone(res , true)
    })
  }
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleRespone(res , false)
      })
  }
  const handleRespone = (res , redirect) => {
    setUser(res)
    setLoggedInUser(res)
    history.replace(from);
  }
  const fbSignIN = () => {
    handleFacebook()
      .then(res => {
        handleRespone(res , true)
        })
  }
  const getValuebByonBlur = (event) => {
    let isFieldValid;
    if (event.target.name === 'name') {
      isFieldValid = event.target.value;
    }
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
      // console.log(isEmailValidate);
    }
    if (event.target.name === 'password') {
      const isPsswordValid = event.target.value.length > 6;
      const passwordHasLatter = (/[a-zA-Z]/).test(event.target.value) //validation with regex
      isFieldValid = isPsswordValid && passwordHasLatter;
    }
    // update to state
    if (isFieldValid) {
      const newUserInfo = { ...user } // copy user state
      newUserInfo[event.target.name] = event.target.value; //-*--*-*-important
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          setUser(res)
          setLoggedInUser(res)
          history.replace(from);
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleRespone(res , false)
        })
    }
    event.preventDefault();
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Our Own Authentication</h3>
      <button className="btn btn-warning" onClick={fbSignIN}>sign in with facebook</button>
      {
        user.isLogedIn ? <button className="btn btn-primary" onClick={signOut}>Sign Out</button> :
          <button className="btn btn-primary" onClick={googleSignIn}>Sign In</button>
      }
      {
        user.isLogedIn ? <div>
          <p>welcome , {user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="shakil" />
        </div> : <p>{massage.massage}</p>
      }
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User sign</label>
      <form action="">
        {
          newUser && <input type="text" name="name" onBlur={getValuebByonBlur} id="" required placeholder="name" />
        }
        <br />
        <input type="email" onBlur={getValuebByonBlur} name="email" required id="" placeholder="Email" />
        <br />
        <input type="password" onBlur={getValuebByonBlur} name="password" required id="" placeholder="Password" />
        <br />
        <input type="submit" onClick={handleSubmit} value={newUser ? "Sign Up " : "sign in"} />
        <input type="reset" value="Reset" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>
        user {newUser ? 'created' : "logged in"}  successfully!
        </p>}
    </div>
  );
}

export default LogIn;
