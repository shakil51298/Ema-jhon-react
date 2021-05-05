import React, { useContext, useState } from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.photo);

    return (
        <div className="header">
            <div className="p-4">
                <img src={logo} alt="logo" />
            </div>
            <nav className="p-2">
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.isSignedIn ? <button className="btn btn-warning" onClick={() => setLoggedInUser({})}>Sign out</button> :
                        <Link to="/login" className="btn btn-warning">
                            Sign In
                    </Link>
                }
                {
                    loggedInUser.isSignedIn && <Link className="text-white ml-3" to="/inventory">{loggedInUser.name || loggedInUser.email}</Link>
                }
            </nav>
        </div>
    );
};

export default Header;