import React, {useEffect} from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createStripePaymentSecret} from "../../store/action/index.js";
import Skeleton from "../shared/Skeleton.jsx";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const StripePayment = () => {
    const dispatch = useDispatch();
    const {clientSecret } = useSelector((state) => state.auth)
    const {totalPrice } = useSelector((state) => state.carts)
    const {isLoading, errorMessage }= useSelector((state) => state.errors)

    useEffect(() => {
        if (!clientSecret ){
            dispatch(createStripePaymentSecret(totalPrice))
        }
    }, [clientSecret, totalPrice, dispatch]);
    if (isLoading){
        <div className="max-w-lg mx-auto">
            <Skeleton />
        </div>
    }


    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
                </Elements>
            )}
        </>
    )
}
export default StripePayment
