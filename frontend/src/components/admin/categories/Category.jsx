import React, {useState} from 'react'
import {MdAddShoppingCart} from "react-icons/md";
import {FaBoxOpen, FaThList} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Loader from "../../shared/Loader.jsx";
import {adminCategoryTableColumn} from "../../helper/TableColumns.jsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDashboardCategoryFilter} from "../../../hooks/useCategoryFilter.js";
import AddProductForm from "../products/AddProductForm.jsx";
import Modal from "../../shared/Modal.jsx";
import AddCategoryForm from "./AddCategoryForm.jsx";
import {deleteCategoryFromDashboard, deleteProductFromDashboard} from "../../../store/action/index.js";
import toast from "react-hot-toast";
import DeleteModal from "../../checkout/DeleteModal.jsx";

const Category = () => {
    const {categories, pagination } = useSelector((state) => state.products)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;

    const [currentPage, setCurrentPage] = useState(pagination?.pageNumber +1 || 1)
    const [openAddCategoryModal, setOpenAddCategoryModal ] = useState(false);
    const [loader, setLoader ] = useState(false);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState();
    const [newCategory, setNewSelectedCategory] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const {categoryLoader,isLoading,  errorMessage } = useSelector((state) => state.errors)
    const emptyCategory = !categories || categories?.length === 0;

    const tableRecords = categories?.map((item) => {
        return {
            id: item.categoryId,
            categoryName: item.categoryName,
        }
    });
    useDashboardCategoryFilter();
    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page +1;
        setCurrentPage(page);
        params.set("page", page.toString())
        navigate(`${pathname}?${params.toString()}`)
    };

    const handleEdit =(category)=> {
        setSelectedCategory(category)
        setOpenEditModal(true)
    }

    const handleDelete =(category)=> {
        setSelectedCategory(category)
        setOpenDeleteModal(true)
    }

    const onDeleteHandler = () => {
        dispatch(deleteCategoryFromDashboard(
            setLoader, selectedCategory?.id, toast, setOpenDeleteModal
        ))
    }
    return (
        <div>
            {/*Add Category Button*/}
            <div className="pt-6 pb-10 flex justify-end">
                <button className="bg-custom-blue  hover:bg-blue-800 text-white font-semibold flex items-center py-2 px-4 gap-2 rounded-md shadow-md transition-colors duration-300 hover:text-slate-300"
                        onClick={() => setOpenAddCategoryModal(true)}
                >
                    <FaThList className="text-xl" />
                    Add Category
                </button>
            </div>
            {/*All Categories*/}
            {!emptyCategory && (
                <h1 className="text-slate-800 text-3xl text-center font-semibold pb-6 uppercase">
                    All Categories
                </h1>
            )}
            {isLoading ? (
                <Loader />
            ):(
                <>
                    {emptyCategory ? (
                        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                            <FaBoxOpen size={50} className="mb-3 "/>
                            <h2 className="text-2xl font-semibold">
                                No Category exist
                            </h2>
                        </div>
                    ): (
                        <div className="max-w-full">
                            <DataGrid
                                className="w-full"
                                rows={tableRecords}
                                columns={adminCategoryTableColumn(
                                    handleEdit,
                                    handleDelete
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
                open={openEditModal || openAddCategoryModal}
                setOpen={openEditModal? setOpenEditModal : setOpenAddCategoryModal}
                title={openEditModal ?"Edit Category": "Add Category"}
            >
                <AddCategoryForm
                    setOpen={openEditModal? setOpenEditModal : setOpenAddCategoryModal}
                    category={openEditModal? selectedCategory : newCategory }
                    update={openEditModal}
                />
            </Modal>

            <DeleteModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                title={"Delete Category"}
                onDeleteHandler={onDeleteHandler}
                loader={loader}
            >
            </DeleteModal>
        </div>

    )
}
export default Category
