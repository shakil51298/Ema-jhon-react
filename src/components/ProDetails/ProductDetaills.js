import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';

const ProductDetaills = () => {
    let {productkey} = useParams();
    const [spninner , setSpnniner ] = useState(true)

    const [pds , setPds ] = useState([])
    const {img, key , name , price, seller , stock} = pds
    useEffect(()=>{
        setPds(fakeData.find(pd => pd.key === productkey))
        setSpnniner(false)
    },[])
    document.title ="product details"
    return (
        <div>
            {
                spninner ? <h1>Loding.....</h1>:<div>
                    <h3>{productkey} Details Cominng Sooooooooon!!!!</h3>
                <img src={img} alt=""/>
                <p>{name}</p>
                <p>{key}</p>
                <p>{price}</p>
                <p>{seller}</p>
                <p> stock: {stock}</p>
                </div>
            }
            {/* <Product showAddtoCart={false} product={newPd}></Product> */}
        </div>
    );
};

export default ProductDetaills;



