import React from 'react';

const ReviewItem = (props) => {
    const {name,category,seller,price,wholePrice,img,key,quantity,url} = props.product
    // console.log(props.product);
    
    const styles ={
        border:'1px solid red',
        padding:'15px',
        margin:'5px'
    }
    document.title ="Review Producs"
    return (
        <div style={styles}>
            <img src={img} alt=""/>
            <p><small>${price}</small></p>
            <h5 className="pro-name">{name}</h5>
            <h5>{category}</h5>
            <h5>Quantity: {quantity}</h5>
            <h5>{seller}</h5>
            <h5>{wholePrice}</h5>
            <h5>seller: {seller}</h5>
            <a href={url} target='_blank' rel="link">Link</a>
            <br/>
            <br/>
            <button className="add-to-cart-btn"
            onClick={()=>props.removehnadler(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;