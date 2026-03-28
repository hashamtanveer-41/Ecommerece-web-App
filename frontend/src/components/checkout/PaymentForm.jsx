import React, {useState} from 'react'
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Skeleton from "../shared/Skeleton.jsx";

const PaymentForm = ({clientSecret, totalPrice}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage]= useState("")

    const paymentElementOptions = {
        layout: "tabs"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements){
            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError){
            setErrorMessage(submitError.message || "Unable to submit payment details.");
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements, clientSecret,
            confirmParams: {
                return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },

        });
        if (error){
            setErrorMessage(error.message || "Payment failed. Please try again.");
            return false;
        }
    }

    const isLoading = !clientSecret || !stripe || !elements;

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">
                Payment Information
            </h2>
            {isLoading? (
                <Skeleton />
            ): (
                <>
                    {clientSecret && <PaymentElement options={paymentElementOptions}/>}
                    {errorMessage && (
                        <div className="text-red-600 mt-2">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        className='text-white bg-black w-full px-5 py-2.5 mt-2 disabled:opacity-60 disabled:animate-pulse font-semibold rounded-md'
                        disabled={!stripe || isLoading}
                    >
                        {!isLoading ? `Pay $${Number(totalPrice).toFixed(2)
                        }`:(
                        "Processing")}
                    </button>
                </>
            )}
        </form>
    )
}

export default PaymentForm;
