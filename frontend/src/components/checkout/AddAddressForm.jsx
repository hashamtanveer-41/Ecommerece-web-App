import React, {useEffect} from 'react'
import InputField from "../shared/InputField.jsx";
import Spinners from "../shared/Spinners.jsx";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FaAddressCard} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {addUpdateUserAddress} from "../../store/action/index.js";
import toast from "react-hot-toast";

const AddAddressForm = ({address, setOpenAddressModal}) => {
    const dispatch = useDispatch();
    const {btnLoader} = useSelector((state) => state.errors);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors}
    } = useForm({
        mode: "onTouched",
    });

    const onSaveAddressHandler = (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal,
        ));
    };

    useEffect(() => {
        if (address?.addressId){
            setValue("buildingName", address?.buildingName);
            setValue("city", address?.city);
            setValue("street", address?.street);
            setValue("pincode", address?.pincode);
            setValue("state", address?.state);
            setValue("country", address?.country);
        }
    }, []);
    return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
            >
                {/*Address PopUp*/}
                <div className="flex justify-center items-center space-y-4 mb-4 text-2xl font-semibold text-slate-800 py-2 px-4 ">
                    <FaAddressCard className="mr-2 text-2xl" />
                    {!address?.addressId? ("Add Address"):("Update Form")}
                </div>
                <hr className="mt-2 mb-5 text-black" />
                <div className="flex flex-col gap-4">

                    {/*Username input field*/}
                    <InputField
                        label= "Building Name"
                        required
                        id="buildingName"
                        type="text"
                        message="*Building Name is mandatory"
                        placeHolder="Enter Building Name"
                        register={register}
                        errors={errors}
                    ></InputField>

                    <InputField
                        label= "Street"
                        required
                        id="street"
                        type="text"
                        message="*Street Name is mandatory"
                        placeHolder="Enter Street Name"
                        register={register}
                        errors={errors}
                    ></InputField>

                    {/*Password input field*/}
                    <InputField
                        label= "City"
                        required
                        id="city"
                        type="text"
                        message="*City name is mandatory"
                        placeHolder="Enter City name"
                        register={register}
                        errors={errors}
                    ></InputField>

                    <InputField
                        label= "State"
                        required
                        id="state"
                        type="text"
                        message="*State is mandatory"
                        placeHolder="Enter State"
                        register={register}
                        errors={errors}
                    ></InputField>

                    <InputField
                        label= "Pincode"
                        required
                        id="pincode"
                        type="number"
                        message="*Pincode is mandatory"
                        placeHolder="Enter Pincode"
                        register={register}
                        errors={errors}
                    ></InputField>

                    <InputField
                        label= "Country"
                        required
                        id="country"
                        type="text"
                        message="*Country is mandatory"
                        placeHolder="Enter Country"
                        register={register}
                        errors={errors}
                    ></InputField>


                    {/*Login Button*/}
                    <button
                        disabled={btnLoader}
                        className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                        type="submit"
                    >
                        {btnLoader ? (
                            <>
                                <Spinners />  Loading...
                            </>
                        ) : (
                            <>{!address?.addressId? ("Save Address"):("Update Form")}</>
                        )}
                    </button>

                    {/*Dont have account and SignUp text*/}
                    <p className="text-center text-slate-800 text-sm mt-6">
                        Don't have an account
                        <Link
                            className="font-semibold underline hover:text-black"
                            to="/register"
                        >
                            <span>SignUp</span>
                        </Link>
                    </p>

                </div>
            </form>
        </div>
    )
}
export default AddAddressForm
