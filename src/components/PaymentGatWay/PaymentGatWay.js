import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitForm';

const PaymentGatWay = ({handlePaymentSuccess}) => {
   
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    return (
        <div className="mt-3 border p-3">
            <h3>Payment</h3>
            <Elements stripe={stripePromise}>
                <SplitForm handlePaymentSuccess = {handlePaymentSuccess}/>
                {/* <SimpleCardForm/> */}
            </Elements>
            
        </div>
    );
};

export default PaymentGatWay;