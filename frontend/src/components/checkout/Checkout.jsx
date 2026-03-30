import React, {useEffect, useState} from 'react'
import {Step, StepLabel, Stepper} from "@mui/material";
import AddressInfo from "./AddressInfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllAddresses} from "../../store/action/index.js";
import {Button} from "@headlessui/react";
import toast from "react-hot-toast";
import Skeleton from "../shared/Skeleton.jsx";
import ErrorPage from "../shared/ErrorPage.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import OrderSummary from "./OrderSummary.jsx";
import StripePayment from "./StripePayment.jsx";
import PaypalPayment from "./PaypalPayment.jsx";

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const {paymentMethod} = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    const {cart, totalPrice} = useSelector((state) => state.carts)
    const {errorMessage, isLoading } = useSelector((state) => state.errors);
    const {address, selectedUserCheckoutAddress} = useSelector((state) => state.auth)
    useEffect(() => {
        dispatch(getAllAddresses());
    }, [dispatch]);
    const handleBack = () =>{
        setActiveStep((prevStep) => prevStep -1)
    }

    const handleNext= () =>{
        if (activeStep === 0 && !selectedUserCheckoutAddress){
            toast.error("Please select checkout Address to proceed.")
            return;
        }
        if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)){
            toast.error("Please select checkout Address to proceed.")
            return;
        }

        setActiveStep((prevStep) => prevStep +1)
    }

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

            {isLoading ? (
                <div className="lg:w-[80%] mx-auto py-5">
                    <Skeleton />
                </div>
            ):(
                <div className="mt-5">
                    {activeStep===0 && <AddressInfo address={address}/>}
                    {activeStep===1 && <PaymentMethod />}
                    {activeStep===2 && <OrderSummary cart={cart} paymentMethod={paymentMethod} address={selectedUserCheckoutAddress} totalPrice={totalPrice} />}
                    {activeStep === 3 &&
                            <>
                                {paymentMethod === "Stripe"? (
                                   <StripePayment />
                                ):(
                                    <PaypalPayment />
                                )}
                            </>
                    }
                </div>
            )}


            <div
                className='flex justify-between items-center px-4 fixed z-50 h-18 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
                style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
            >
                <Button
                    className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${activeStep === 0 && "opacity-60"}`}
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>

                {activeStep !== steps.length-1 && (
                    <button
                        disabled={
                            errorMessage || (
                                (activeStep === 0 ? !selectedUserCheckoutAddress :
                                activeStep === 1 ? !paymentMethod
                                : false)
                            )
                        }
                        className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white 
                        ${
                            errorMessage ||
                            (activeStep === 0 && !selectedUserCheckoutAddress)
                            || (activeStep === 1 && !paymentMethod) ? 
                                "opacity-60" : ""
                        }`}
                        onClick={handleNext}
                    >
                        Proceed
                    </button>
                )}
            </div>
            {errorMessage && <ErrorPage message={errorMessage} /> }
        </div>
    )
}
export default Checkout
