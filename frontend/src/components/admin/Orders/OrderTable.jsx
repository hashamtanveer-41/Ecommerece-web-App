import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {adminOrderTableColumn} from "../../helper/TableColumns.jsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Modal from "../../shared/Modal.jsx";
import UpdateOrdersForm from "./UpdateOrdersForm.jsx";
import loader from "../../shared/Loader.jsx";

const OrderTable = ({adminOrder, pagination}) => {
    const navigate = useNavigate();
    const [loader, setLoader ] = useState(false);
    const [selectedItem, setSelectedItem] =useState("");
    const [updateOpenModal, setUpdateOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber +1 || 1
    );
    const handleEdit = (order)=>{
        setSelectedItem(order)
        setUpdateOpenModal(true)
    }
    const pathname = useLocation();
    const [searchParams] = useSearchParams();
    const params =  new URLSearchParams(searchParams);
    const tableRecords = adminOrder?.map((item) => {
        return {
            id: item.orderId,
            email: item.email,
            totalAmount: item.totalAmount,
            status: item.orderStatus,
            date: item.orderDate,
        }
    });
    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page +1;
        setCurrentPage(page);
        params.set("page", page.toString())
        navigate(`${pathname}?${params}`)
    };
    return (
        <div className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
            <h1>All Orders</h1>


            <div>
                <DataGrid
                    className="w-full"
                    rows={tableRecords}
                    columns={adminOrderTableColumn(handleEdit)}
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
            <Modal
                open={updateOpenModal}
                setOpen={setUpdateOpenModal}
                title='Update Order Status'
            >
                <UpdateOrdersForm
                    open={updateOpenModal}
                    setOpen={setUpdateOpenModal}
                    loader={loader}
                    selectedItem={selectedItem}
                    selectedId={selectedItem.id}
                    setLoader={setLoader}
                />
            </Modal>
        </div>
    )
}
export default OrderTable
