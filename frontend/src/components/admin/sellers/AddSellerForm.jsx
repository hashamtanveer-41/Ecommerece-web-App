import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../shared/InputField.jsx";
import {Button} from "@headlessui/react";
import Spinners from "../../shared/Spinners.jsx";
import {addNewSellerFromDashboard} from "../../../store/action/index.js";

const AddSellerForm = ({setOpen}) => {
    const [loader, setLoader ] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm({mode: "onTouched"});

    const addSellerHandler = (data) => {
            const sendData = {
                ...data,
                role: ["seller"],
            };
            console.log(sendData.categoryName)
            dispatch(addNewSellerFromDashboard(sendData, toast, reset, setLoader, setOpen));
    }
    return (
        <div className="py-5 relative h-full ">
            <form className="space-y-4" onSubmit={handleSubmit(addSellerHandler)}>
                {/* UserName*/}
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        label="Userame"
                        required
                        id="username"
                        type="text"
                        message="This field is required"
                        placeHolder="User Name"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="This field is required"
                        placeHolder="Email"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="This field is required"
                    placeHolder="Password"
                    register={register}
                    errors={errors}
                />
                </div>

                <div className="w-full flex justify-between items-center absolute bottom-15">
                    <Button disabled={loader}
                            onClick={()=>setOpen(false)}
                            variant="outlined"
                            className="text-slate-700 border border-slate-400 rounded-md px-4 py-2.5 text-sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loader}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="bg-custom-blue rounded-md text-white px-4 py-2.5 text-sm"
                    >
                        {loader?(
                            <div className="flex gap-2 items-center">
                                <Spinners /> Loading...
                            </div>
                        ):(
                            "Add New Seller"
                        )}
                    </Button>

                </div>
            </form>
        </div>
    )
}
export default AddSellerForm
