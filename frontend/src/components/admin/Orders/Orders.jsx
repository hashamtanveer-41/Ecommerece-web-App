import React from 'react'
import {FaShoppingCart} from "react-icons/fa";
import OrderTable from "./OrderTable.jsx";
import useOrderFilter from "../../../hooks/UseOrderFilter.js";
import {useSelector} from "react-redux";

const Orders = () => {
    const {adminOrder, pagination} = useSelector((state) => state.order);
    useOrderFilter();
    const emptyOrder = !adminOrder || adminOrder?.length === 0;
    return (
        <div>
            {emptyOrder
                ? (
                    <div className="flex flex-col items-center justify-center text-gray-600 py-10" >
                        <FaShoppingCart size={50} className="mb-3"/>
                        <h2>No Orders Placed.</h2>
                    </div>
                ):(
                    <div>
                        <OrderTable adminOrder={adminOrder} pagination={pagination}/>
                    </div>
                )}
        </div>
    )
}
export default Orders
