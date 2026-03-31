import React, {useState} from 'react'
import {MdAddShoppingCart} from "react-icons/md";
import {useSelector} from "react-redux";
import Loader from "../../shared/Loader.jsx";
import {FaBoxOpen} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import { adminProductTableColumn} from "../../helper/TableColumns.jsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDashboardProductFilter} from "../../../hooks/useProductFilter.js";
import Modal from "../../shared/Modal.jsx";
import AddProductForm from "./AddProductForm.jsx";

const AdminProducts = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;

    const {products, pagination} = useSelector((state) => state.products);
    const {isLoading, errorMessage } = useSelector((state) => state.errors);

    const emptyProduct = !products || products?.length === 0;


    const [selectedProduct, setSelectedProduct] =useState("");
    const [updateOpenModal, setUpdateOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber +1 || 1
    );

    const tableRecords = products?.map((item) => {
        return {
            id: item.productId,
            productName: item.productName,
            description: item.description,
            discount: item.discount,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            specialPrice: item.specialPrice,
        }
    });

    useDashboardProductFilter();
    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page +1;
        setCurrentPage(page);
        params.set("page", page.toString())
        navigate(`${pathname}?${params.toString()}`)
    };
    const handleEdit = (product)=> {
        setSelectedProduct(product)
        setUpdateOpenModal(true)
    }
    const handleDelete = (product)=> {
        setSelectedProduct(product)
        setUpdateOpenModal(true)
    }
    const handleImageUpload  = (product) => {
        setSelectedProduct(product)
        setUpdateOpenModal(true)
    }

    const handleProductView = (product) => {
        setSelectedProduct(product)
        setUpdateOpenModal(true)
    }

    return (
        <div >
            <div className="pt-6 pb-10 flex justify-end">
                <button className="bg-custom-blue  hover:bg-blue-800 text-white font-semibold flex items-center py-2 px-4 gap-2 rounded-md shadow-md transition-colors duration-300 hover:text-slate-300"
                    onClick={() => setOpenAddModal(true)}
                >
                    <MdAddShoppingCart className="text-xl" />
                    Add Product
                </button>
            </div>

            {!emptyProduct && (
                <h1 className="text-slate-800 text-3xl text-center font-semibold pb-6 uppercase">
                    All Products
                </h1>
            )}
            {isLoading ? (
                <Loader />
            ):(
                <>
                {emptyProduct ? (
                        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                            <FaBoxOpen size={50} className="mb-3 "/>
                          <h2 className="text-2xl font-semibold">
                              No product exist
                          </h2>
                        </div>
                    ): (
                        <div className="max-w-full">
                            <DataGrid
                                className="w-full"
                                rows={tableRecords}
                                columns={adminProductTableColumn(
                                    handleEdit,
                                    handleDelete,
                                    handleImageUpload,
                                    handleProductView
                                )}
                                paginationMode="server"
                                rowCount={pagination?.totalElements || 0}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: pagination?.pageSize || 10,
                                            page: currentPage -1,
                                        },
                                    },

                                }}
                                onPaginationModelChange={handlePaginationChange}
                                disableColumnResize
                                pageSizeOptions={[pagination?.pageSize || 10]}
                                pagination
                                paginationOptions={{
                                    showFirstButton: true,
                                    showLastButton: true,
                                    hideNextButton: currentPage === pagination?.totalPages,

                                }}
                                disableRowSelectionOnClick
                            />
                        </div>
                    )}
                </>
            )}
            <Modal
            open={updateOpenModal || openAddModal}
            setOpen={updateOpenModal? setUpdateOpenModal : setOpenAddModal}
            title={updateOpenModal ?"Update Product": "Add Product"}
            >
                <AddProductForm
                    setOpen={updateOpenModal? setUpdateOpenModal : setOpenAddModal}
                    product={selectedProduct}
                    update={updateOpenModal}
                />
            </Modal>
        </div>
    )
}
export default AdminProducts
