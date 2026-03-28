import React, {useEffect} from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createStripePaymentSecret} from "../../store/action/index.js";
import Skeleton from "../shared/Skeleton.jsx";


const stripePromise = loadStripe("pk_test_51TFgFRCJfVhKV9Z5ginHIOlkE1oc9hkKWsisncUqd9r0vm6yykvZUUInNA518sAbIEgVLnM2jMtQqNRL4k2REulW00s5F6yyKW");
const StripePayment = () => {
    const dispatch = useDispatch();
    const {clientSecret } = useSelector((state) => state.auth)
    const {totalPrice } = useSelector((state) => state.carts)
    const {isLoading }= useSelector((state) => state.errors)
    const {user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!clientSecret){
            const sendData = {
                amount: Number(totalPrice)*100,
                currency: "usd",
                email: user.email,
                name: `${user.username}`,
                address: selectedUserCheckoutAddress,
                description: `Order for ${user.email}`,
                metadata: {
                    test: "1"
                }
            }
            dispatch(createStripePaymentSecret(sendData))
        }
    }, [clientSecret, dispatch, selectedUserCheckoutAddress?.addressId, totalPrice, user?.email, user?.username]);
    if (isLoading){
        return (
            <div className="max-w-lg mx-auto">
                <Skeleton />
            </div>
        )
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
