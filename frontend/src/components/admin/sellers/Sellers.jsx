import React, {useState} from 'react'
import {useSelector} from "react-redux";
import useSellerFilter from "./useSellerFilter.jsx";
import ErrorPage from "../../shared/ErrorPage.jsx";
import {MdPersonAdd} from "react-icons/md";
import Loader from "../../shared/Loader.jsx";
import {FaBoxOpen} from "react-icons/fa";
import SellerTable from "./SellerTable.jsx";
import Modal from "../../shared/Modal.jsx";
import AddSellerForm from "./AddSellerForm.jsx";

const Sellers = () => {
    const [openModal, setOpenModal] = useState(false);
    const {sellers, pagination} = useSelector((state) => state.sellers);
    const {isLoading, errorMessage} = useSelector((state) => state.errors)

    useSellerFilter();

    const emptySellers = !sellers || sellers?.length === 0;
    if (errorMessage) return <ErrorPage message={errorMessage} />;

    return (
        <div>
            {/*Add Category Button*/}
            <div className="pt-6 pb-10 flex justify-end">
                <button className="bg-custom-blue  hover:bg-blue-800 text-white font-semibold flex items-center py-2 px-4 gap-2 rounded-md shadow-md transition-colors duration-300 hover:text-slate-300"
                        onClick={() => setOpenModal(true)}
                >
                    <MdPersonAdd className="text-xl" />
                    Add Seller
                </button>
            </div>
            {/*All Sellers*/}
            {!emptySellers && (
                <h1 className="text-slate-800 text-3xl text-center font-semibold pb-6 uppercase">
                    All Sellers
                </h1>
            )}
            {isLoading ? (
                <Loader />
            ):(
                <>
                    {emptySellers ? (
                        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                            <h2 className="text-2xl font-semibold">
                                No Seller created
                            </h2>
                        </div>
                    ): (
                        <SellerTable sellers={sellers} pagination={pagination} />
                    )}
                </>
            )}
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                title="Add new Seller"
            >
            <AddSellerForm setOpen={setOpenModal} />
            </Modal>
        </div>
    )
}
export default Sellers
