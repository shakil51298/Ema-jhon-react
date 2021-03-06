import React from 'react';

const ReviewItem = (props) => {
    const {name,category,seller,wholePrice,img,quantity,startCount,stock,url,priceFraction} = props.product
    console.log(props.product);
    
    const styles ={
        border:'1px solid red',
        padding:'15px',
        margin:'5px'
    }
    return (
        <div style={styles}>
            <img src={img} alt=""/>
            <h5 className="pro-name">{name}</h5>
            <h5>{category}</h5>
            <h5>Quantity: {quantity}</h5>
            <h5>{seller}</h5>
            <h5>{wholePrice}</h5>
            <h5>seller: {seller}</h5>
            <a href={url} target='_blank'>Link</a>
            <br/>
            <br/>
            <button className="add-to-cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;