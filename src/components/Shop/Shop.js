import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('')
    console.log(search);

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const submitSearch = (e) =>{
        
        e.preventDefault();
    }
    useEffect(()=>{
        fetch('https://tranquil-citadel-79174.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
        
    }, [search])
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://tranquil-citadel-79174.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container" >
            <form action="" onSubmit={submitSearch}>
                <input type="text" placeholder="search " onBlur={handleSearch}/>
                <input type="reset" value="clear"/>
            </form>
            {
                products.length === 0 && <h1>Loding.....</h1>
            }
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;