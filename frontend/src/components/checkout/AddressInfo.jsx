import React, {useState} from 'react'
import Skeleton from "../shared/Skeleton.jsx";
import {FaAddressBook} from "react-icons/fa";
import {AddressInfoModal} from "./AddressInfoModal.jsx";
import AddAddressForm from "./AddAddressForm.jsx";

const AddressInfo = () => {
    const noAddressExist = true;
    const isLoading = false;
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const addNewHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };
    return (
        <div className="pt-4">
            {noAddressExist ? (
                <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
                    <FaAddressBook size={45} className="text-gray-600 mb-4" />
                    <h1 className="text-slate-900 text-center font-semibold text-2xl">
                        No Address Added yet
                    </h1>
                    <p className="mb-6 text-slate-600 text-center">
                        Please add address to proceed with purchase
                    </p>

                    <button
                        className="px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition duration-300"
                        onClick={addNewHandler}>
                        Add Address
                    </button>
                </div>
            ):(
                <div className="relative p-6 rounded-lg  max-w-md mx-auto">
                    <h1 className="text-slate-800 text-center font-bold text-2xl">
                        Select Address
                    </h1>

                    {isLoading? (
                        <div className="py-4 px-8">
                            <Skeleton/>
                        </div>
                    ):(
                        <div className="space-y-4 pt-6">
                            <p>Address List</p>
                        </div>
                    )}
                </div>
            )
            }
            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}
            >
            <AddAddressForm
                address = {selectedAddress}
                setOpenAddressModal = {setOpenAddressModal}
            />
            </AddressInfoModal>
        </div>
    )
}
export default AddressInfo
