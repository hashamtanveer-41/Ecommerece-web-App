import React, {useEffect, useState} from 'react'
import {Step, StepLabel, Stepper} from "@mui/material";
import AddressInfo from "./AddressInfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllAddresses} from "../../store/action/index.js";

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const {address} = useSelector((state) => state.auth)
    useEffect(() => {
        dispatch(getAllAddresses());
    }, [dispatch]);
    const  steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment"
    ]
    return (
        // Stepper to show progress
        <div className='py-14 min-h-[calc(100vh-100px)]'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>


            <div className="mt-5">
                {activeStep===0 && <AddressInfo address={address}/>}
            </div>
        </div>
    )
}
export default Checkout
