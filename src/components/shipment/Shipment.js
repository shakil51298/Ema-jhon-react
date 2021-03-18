import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import "./Shipment.css"

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

  console.log(watch("example")); 
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="name"/>
      {errors.name && <span className="error">Name field is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="email"/>
      {errors.email && <span className="error">email field is required</span>}
      
      <input name="phone" ref={register({ required: true })} placeholder="Phone Number"/>
      {errors.phone && <span className="error">Phone field is required</span>}
      
      <input name="address" ref={register({ required: true })} placeholder="Address"/>
      {errors.address && <span className="error">address field is required</span>}
      
      <input name="remark" ref={register({ required: true })} placeholder="remark"/>
      {errors.remark && <span className="error">remark field is required</span>}
     
      <input type="submit" />
    </form>
  );
};

export default Shipment;