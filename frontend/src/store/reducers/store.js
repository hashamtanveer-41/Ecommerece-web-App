import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./ProductReducer.js";
import {errorReducer} from "./errorReducer.js";
import {cartReducer} from "./cartReducer.js";
import {authReducer} from "./authReducer.js";
import {paymentMethodReducer} from "./paymentMethodReducer.js";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[];

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    :  null;

const selectedCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    :  [];

const initialState =  {
    auth: {user: user, selectedCheckoutAddress},
    carts: {cart: cartItems},
}
const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: initialState,
})

export default store;