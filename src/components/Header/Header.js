import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

    return (
        <div className="header">
            <img src={logo} ></img>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order review">Order Review</a>
                <a href="/manage inventory">Manage Inventory here</a>
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