import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Skeleton from "../shared/Skeleton.jsx";
import {FaCheckCircle} from "react-icons/fa";
import {stripePaymentConfirmation} from "../../store/action/index.js";
import toast from "react-hot-toast";

const PaymentConfirmation = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.carts)
    const [errorMessage, setErrorMessage ] = useState("");
    const {loading, setLoading}= useState();
    const selectedCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        :[];

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret=searchParams.get("payment_intent_client_secret");
    const redirectStatus =searchParams.get("redirect_status");

    useEffect(() => {
        if (paymentIntent
            &&clientSecret&&
            redirectStatus&&
            cart.length>0){
                const sendData = {
                    addressId: selectedCheckoutAddress.addressId,
                    pgName: "Stripe",
                    pgPaymentId: paymentIntent,
                    pgStatus: "succeeded",
                    pgResponseMessage: "Payment Successful",

                }
                dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast))
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart]);
    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading ? (
                <div className="max-w-xl mx-auto">
                    <Skeleton />
                </div>
            ) :(
                <div className="p-8 rounded-lg shadow-lg text-center max-w-lg mx-auto  border bg-gray-200">
                    <div className="text-green-500 mb-4 flex justify-center">
                        <FaCheckCircle size={64}/>
                    </div>
                    <h2 className="text-xl text-gray-800 font-bold mb-4">Payment Successfull</h2>
                    <p className="text-gray-600 mb-6 ">
                        Thank you for your purchase! Your payment was successful. Your
                        order is being processed.
                    </p>
                </div>
            )}
        </div>
    )
}
export default PaymentConfirmation
