import React from 'react'
import {Alert, AlertTitle} from "@mui/material";

const PaypalPayment = () => {
    return (
        <div className="h-96 flex justify-center items-center">
            <Alert severity="warning" variant="filled" style={{maxWidth: "500px"}}>
                <AlertTitle >Paypal Unavailable</AlertTitle>
                Paypal payment unavailable. Please try with other payment Method.
            </Alert>
        </div>
    )
}
export default PaypalPayment
