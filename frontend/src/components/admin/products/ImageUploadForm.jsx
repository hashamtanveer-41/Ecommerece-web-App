import React, {useRef, useState} from 'react'
import {FaCloudUploadAlt} from "react-icons/fa";

const ImageUploadForm = () => {
    const fileInputRef= useRef();
    const [preview, setPreview] = useState(null);
    const onHandleImageChange = (e) => {

    }

    const addNewImageHandler = () => {

    }
    const handleClearImage = () => {

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
                            accept=".jpeg .jpg .png .mp4"
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
                                className="text-rose-700 px-2 py-1 rounded-md "
                            >
                                Clear Image
                            </button>
                        </div>
                    ):(

                        )}
                </div>
            </form>
        </div>
    )
}
export default ImageUploadForm
