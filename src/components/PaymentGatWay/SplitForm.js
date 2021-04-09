import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import './SpliteFrom.css'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const useOptions = () => {

    const fontSize = "16px";
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitForm = ({handlePaymentSuccess}) => {

    
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const cardElement = elements.getElement(CardNumberElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });
        if (error) {
            toast.error(error.message, { position: toast.POSITION.TOP_CENTER, autoClose: 4000 })
        }
        else {
            console.log("[PaymentMethod]", paymentMethod);
            setPaymentSuccess(paymentMethod.id)
            handlePaymentSuccess(paymentMethod.id)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="label">
                Card number
                    <CardNumberElement
                    className="input"
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <label className="label">
                Expiration date
                    <CardExpiryElement
                    className="input"
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <label className="label">
                CVC
                    <CardCvcElement
                    className="input"
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <button className="PaymentButton" type="submit" disabled={!stripe}>
                Pay
            </button>
            <ToastContainer />
        </form>
    );
};

export default SplitForm;
