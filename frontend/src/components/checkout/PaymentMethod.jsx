import React, {useEffect, useState} from 'react'
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addPaymentMethod, createUserCart, getUserCart} from "../../store/action/index.js";

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });

            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    };
    return (
        <div className="max-w-md mx-auto p-5 bg-white mt-16 shadow-md rounded-lg border">
            <h1 className="text-2xl font-semibold mb-4 ">
                Select Payment Method
            </h1>
            <FormControl className="">
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                    <FormControlLabel
                        value="Stripe"
                        control={<Radio color="primary" /> }
                        label="Stripe"
                        className="text-gray-600"
                    />

                    <FormControlLabel
                        value="Jazzcash"
                        control={<Radio color="primary" /> }
                        label="Jazzcash"
                        className="text-gray-600"
                    />

                </RadioGroup>
            </FormControl>
        </div>
    )
}
export default PaymentMethod
