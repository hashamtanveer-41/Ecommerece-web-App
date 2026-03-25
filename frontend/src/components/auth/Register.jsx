import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import InputField from "../shared/InputField.jsx";
import {FaUserPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {authenticateRegisterNewUser, authenticateSignInUser} from "../../store/action/index.js";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners.jsx";

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        console.log("Register Click");
        dispatch(authenticateRegisterNewUser(data, toast, reset, navigate, setLoader));


    }
    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-112.5 w-90 shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                {/*Login Page*/}
                <div className="flex flex-col items-center space-y-4">
                    <FaUserPlus className="text-slate-800 text-5xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold ">
                        Register Here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black" />
                <div className="flex flex-col gap-2">
                    {/*Username input field*/}
                    <InputField
                        label= "Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is mandatory"
                        placeHolder="Enter your username"
                        register={register}
                        errors={errors}
                    ></InputField>

                    <InputField
                        label= "Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is mandatory"
                        placeHolder="Enter your email"
                        register={register}
                        errors={errors}
                    ></InputField>

                    {/*Password input field*/}
                    <InputField
                        label= "Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is mandatory"
                        placeHolder="Enter your password"
                        min={6}
                        register={register}
                        errors={errors}
                    ></InputField>

                    {/*Login Button*/}
                    <button
                        disabled={loader}
                        className="bg-button-gradient flex gap-2 justify-center items-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-300 rounded-sm my-3 "
                        type="submit"
                    >
                        {loader ? (
                            <><Spinners /> Loading...</>
                        ) : (
                            <>Sign Up</>
                        )}
                    </button>

                    {/*Dont have account and SignUp text*/}
                    <p className="text-center text-slate-800 text-sm mt-6">
                        Already have an account?
                        <Link
                            className="font-semibold underline hover:text-black"
                            to="/login"
                        >
                            <span>Login</span>
                        </Link>
                    </p>

                </div>
            </form>
        </div>
    );
}
export default Register
