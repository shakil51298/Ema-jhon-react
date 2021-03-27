import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Header = () => {
    const [ setLoggedInUser] = useContext(userContext)
    const handleLogOut = () =>{
        setLoggedInUser([])
    }

    return (
        <div className="header">
            <img src={logo} alt="something"></img>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory here</Link>
                <button onClick={handleLogOut}> sign out</button>
            </nav>

            <div className="inputBox">
                <input type="password"></input> 
                <span className="cart-icon">
                <FontAwesomeIcon icon={faShoppingCart}/> 
                </span>
            </div>
        </div>
    );
};


export default Header;