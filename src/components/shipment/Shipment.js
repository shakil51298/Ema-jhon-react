import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import PaymentGatWay from '../PaymentGatWay/PaymentGatWay';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shipmentDetailsData, setShipmentDetailsData] = useState(null)
  console.log(shipmentDetailsData);
  const onSubmit = data => {
    setShipmentDetailsData(data)
    toast.info('hi ' + data.name + " please pay for , confirm your order", { position: toast.POSITION.TOP_CENTER, autoClose: 4000 })
  };
  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shipmentDetailsData,
      paymentId,
      orderTime: new Date()
    };

    fetch('https://tranquil-citadel-79174.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          toast.success('your order placed successfully and Payment done', { position: toast.POSITION.TOP_CENTER, autoClose: 4000 })
        }
      })
  }

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container text-center">
      <div className="row" >
        <div className="col" style={{ display: shipmentDetailsData ? "none" : "block" }}>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div className="col" style={{ display: shipmentDetailsData ? "block" : "none" }}>
          <PaymentGatWay handlePaymentSuccess={handlePaymentSuccess}/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Shipment;