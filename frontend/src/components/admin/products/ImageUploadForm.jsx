import React, {useRef, useState} from 'react'
import {FaCloudUploadAlt} from "react-icons/fa";
import {Button} from "@headlessui/react";
import Spinners from "../../shared/Spinners.jsx";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {updateProductImageFromDashboard} from "../../../store/action/index.js";

const ImageUploadForm = ({setOpen,product}) => {
    const fileInputRef= useRef();
    const [loader, setLoader ] = useState(false);
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();

    const onHandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file);
            setSelectedFile(file)
        }else{
            toast.error("Please select a valid image file (.jpeg, .jpg, .png)")
            setPreview(null)
            setSelectedFile(null)
        }
    }

    const addNewImageHandler = (event) => {
        event.preventDefault();
        if (!setSelectedFile){
            toast.error("Please Select image before saving");
            return;
        }

        const formData= new FormData();
        formData.append("image", selectedFile)
        dispatch(updateProductImageFromDashboard(formData, product.id, toast, setLoader, setOpen))
    }
    const handleClearImage = () => {
        setPreview(null)
        setSelectedFile(null)
        fileInputRef.current.value = null;
    }

    return (
        <div className="py-5 relative h-full">
            <form className=    "space-y-5" onSubmit={addNewImageHandler}>
                <div className="flex flex-col gap-4 w-full">
                    <label className="flex items-center gap-2 cursor-pointer text-custom-blue  border border-dashed border-custom-blue rounded-md w-full justify-center">
                        <FaCloudUploadAlt size={25}/>
                        <span>Upload Product Image</span>
                        <input
                            type='file'
                            ref={fileInputRef}
                            onChange={onHandleImageChange}
                            className="hidden"
                            accept=".jpeg, .jpg, .png"
                        />
                    </label>

                    {preview && (
                        <div>
                            <img src={preview}
                            alt="Image Preview"
                            className="h-60 rounded-md mb-3"
                            />
                            <button
                                type="button"
                                onClick={handleClearImage}
                                className="text-white px-2 py-1 bg-rose-600 rounded-md "
                            >
                                Clear Image
                            </button>
                        </div>
                    )}
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
                            "Update"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default ImageUploadForm
