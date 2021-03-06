import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../product/Product';

const ProductDetaills = () => {
    let {productkey} = useParams();
    const newPd = fakeData.find(pd => pd.key === productkey);
    
    return (
        <div>
            <h3>{productkey} Details Cominng Sooooooooon!!!!</h3>
            <Product showAddtoCart={false} product={newPd}></Product>
        </div>
    );
};

export default ProductDetaills;



