import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div className="header">
            <img src={logo} ></img>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory here</Link>
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