import React from 'react';
import fakeData from '../../fakeData'

const Inventory = () => {
    const handleAddProduct = () =>{
        fetch('http://localhost:5000/addProducts', {
            method:"POST",
            body: JSON.stringify(fakeData),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>?
        </div>
    );
};

export default Inventory;