import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import InputField from "../../shared/InputField.jsx";
import {
    addNewCategoryFromDashboard,
    addNewProductFromDashboard, updateCategoryFromDashboard,
    updateProductFromDashboard
} from "../../../store/action/index.js";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@headlessui/react";
import Spinners from "../../shared/Spinners.jsx";

const AddCategoryForm = ({ setOpen,category, update = false}) => {
    const [loader, setLoader ] = useState(false);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState();
    const {categories } = useSelector((state) => state.products)
    const {categoryLoader, errorMessage } = useSelector((state) => state.errors)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm({mode: "onTouched"});

    useEffect(() => {
        if (update && category){
            setValue("categoryName", category?.categoryName);
        }
    }, [update, category]);

    const saveCategoryHandler = (data) => {
        if (!update){
            const sendData = {
                ...data,
                categoryName: data.categoryName,
            };
            console.log(sendData.categoryName)
            dispatch(addNewCategoryFromDashboard(sendData, toast, reset, setLoader, setOpen));
        }else{
            const sendData = {
                ...data,
                id: category.id,
                categoryName: data.categoryName,
            };
            console.log(sendData.id)
            dispatch(updateCategoryFromDashboard(sendData, toast, reset, setLoader, setOpen));
        }
    }
    return (
        <div className="py-5 relative h-full ">
         <form className="space-y-4" onSubmit={handleSubmit(saveCategoryHandler)}>
            {/*Category Name*/}
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField
                    label="Category Name"
                    required
                    id="categoryName"
                    type="text"
                    message="This field is required"
                    placeHolder="Category Name"
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
                        "Save"
                    )}
                </Button>

            </div>
        </form>
        </div>
    )
}
export default AddCategoryForm
