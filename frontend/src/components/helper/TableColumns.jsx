import {FaEdit, FaEye, FaImage, FaTrashAlt} from "react-icons/fa";
import Modal from "../shared/Modal.jsx";

export const adminOrderTableColumn = (handleEdit)=>[
    {
        sortable: false,
        disableColumnMenu: true,
        field: "id",
        headerName: "Order Id",
        minWidth: 180,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeads: (params) => <span className="text-center">Order ID</span>
    },
    {
        // Column for customer Email
        disableColumnMenu: true,
        field: "email",
        headerName: "Email",
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Email</span>
    },
    {
        // Column for showing total amount of the order
        disableColumnMenu: true,
        field: "totalAmount",
        headerName: "Total Amount",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: true,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Total Amount</span>
    },
    {
        // Column to display Order Status
        disableColumnMenu: true,
        field: "status",
        headerName: "Status",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Status</span>
    },
    {
        // Column for order Creation Date
        disableColumnMenu: true,
        field: "date",
        headerName: "Date",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Order Date</span>},
    {
        // Custom action column with an Edit button
        disableColumnMenu: true,
        field: "action",
        headerName: "Action",
        width: 250,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Action</span>,
        renderCell: (params) =>{
            return (
                <div className="flex justify-center items-center space-x-2 h-full pt-2">
                    <button className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md">
                        <FaEdit className="mr-2" onClick={() => handleEdit(params.row)}/>
                        Edit
                    </button>
                </div>
            );
        }
    },
];


export const adminProductTableColumn = (handleEdit,
                                        handleDelete,
                                        handleImageUpload,
                                        handleProductView)=>[
    {
        sortable: false,
        disableColumnMenu: true,
        field: "id",
        headerName: "Product Id",
        minWidth: 200,
        headerAlign: "center",
        align: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeads: (params) => <span className="text-center">Product ID</span>
    },
    {
        // Column for customer Email
        disableColumnMenu: true,
        field: "productName",
        headerName: "Product Name",
        align: "center",
        headerAlign: "center",
        editable: false,
        width: 260,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Product Name</span>
    },
    {
        // Column for showing total amount of the order
        disableColumnMenu: true,
        field: "price",
        headerName: "Price",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: true,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Price</span>
    },
    {
        // Column to display Order Status
        disableColumnMenu: true,
        field: "quantity",
        headerName: "Quantity",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Quantity</span>
    },
    {
        // Column for order Creation Date
        disableColumnMenu: true,
        field: "specialPrice",
        headerName: "Special Price",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className="text-center">Special Price</span>
    },{
        // Column for order Creation Date
        disableColumnMenu: true,
        field: "description",
        headerName: "Description",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className="ps-10">Description</span>
    },{
        // Column for order Creation Date
        disableColumnMenu: true,
        field: "image",
        headerName: "Image",
        width: 200,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className="ps-10">Image</span>
    },
    {
        // Custom action column with an Edit button
        disableColumnMenu: true,
        field: "action",
        headerName: "Action",
        width: 400,
        align: "center",
        headerAlign: "center",
        editable: false,
        sortable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span >Action</span>,
        renderCell: (params) =>{
            return (
                <div className="flex justify-center items-center space-x-2 h-full pt-2">
                    <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md">
                        <FaImage className="mr-2" onClick={() => handleImageUpload(params.row)}/>
                        Image
                    </button>

                    <button className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md">
                        <FaEdit className="mr-2" onClick={() => handleEdit(params.row)}/>
                        Edit
                    </button>

                    <button className="flex items-center bg-red-500 text-white px-4 h-9 rounded-md">
                        <FaTrashAlt className="mr-2" onClick={() => handleDelete(params.row)}/>
                        Delete
                    </button>

                    <button className="flex items-center bg-slate-800 text-white px-4 h-9 rounded-md">
                        <FaEye className="mr-2" onClick={() => handleProductView(params.row)}/>
                        View
                    </button>

                </div>
            );
        }
    },
];

