import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,seller,stock,price,key} = props.product;
    
    return (
        <div className="product">
            <div className="responsive">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
            <h4 className="pro-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <p><small>by:{seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>Only {stock} left in stock- Order Soon</small></p>
                {/* Conditional dom showing */}
                 {props.showAddtoCart === true && <button className="add-to-cart-btn" onClick={()=>props.handler(props.product)} ><FontAwesomeIcon icon={faShoppingCart} /> add to cart </button>
            }
            </div>
            </div>
        </div>
    );
};

export default Product;