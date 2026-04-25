import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {sendContactMessage} from "../store/action/index.js";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./shared/InputField.jsx";
import Spinners from "./shared/Spinners.jsx";

const Contact = () => {
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        mode: "onTouched",
    });
    const dispatch = useDispatch();

    const  emailHandler = async (data) => {
        console.log(data)
        dispatch(sendContactMessage(data, toast, reset, setLoader));
    }
    return(
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{backgroundImage: "url('')"}}>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! Please fill out the form below or contact us directly
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(emailHandler)}>
                    <div>
                        <div className="block text-sm font-medium text-gray-700">
                            Name
                        </div>
                        <InputField
                            required
                            id="name"
                            type="text"
                            message="*Name is mandatory"
                            placeHolder="Enter your Name"
                            register={register}
                            errors={errors}
                        ></InputField>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <InputField
                            required
                            id="email"
                            type="text"
                            message="*Email is mandatory"
                            placeHolder="Enter your Email"
                            register={register}
                            errors={errors}
                        ></InputField></div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <InputField
                            required
                            id="message"
                            type="text"
                            message="*Message is mandatory"
                            placeHolder="Enter your Message"
                            register={register}
                            errors={errors}
                            className="focus:outline-hidden focus:ring-2 focus: ring-blue-500"
                        ></InputField>
                    </div>

                    <button
                        disabled={loader}
                        className="bg-blue-500 flex gap-2 justify-center items-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-300 rounded-sm my-3 "
                        type="submit"
                    >
                        {loader ? (
                            <>
                                <Spinners />  Loading...
                            </>
                        ) : (
                            <>Send Message</>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaPhone className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">+92 336 8655135</span>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">hashamtanvr41@gmail.com</span>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarkedAlt className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">H-13, NUST, Islamabad</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;