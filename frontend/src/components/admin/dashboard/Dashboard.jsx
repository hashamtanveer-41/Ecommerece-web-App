import React, {useEffect} from 'react'
import DashboardOverview from "./DashboardOverview.jsx";
import {FaBoxOpen, FaDollarSign, FaShoppingCart} from "react-icons/fa";
import {MdAttachMoney} from "react-icons/md";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {analyticsAction} from "../../../store/action/index.js";
import ErrorPage from "../../shared/ErrorPage.jsx";
import Loader from "../../shared/Loader.jsx";

const Dashboard = () => {
    const dispatch = useDispatch();
    const {isLoading, errorMessage} = useSelector((state) => state.errors);
    const {
        analytics: { productCount, totalRevenue, totalOrders },
    } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(analyticsAction());
    }, [dispatch]);

    if (isLoading){
        return <Loader />
    }

    if (errorMessage){
        return <ErrorPage message={errorMessage} />
    }
    return (
        <div className="flex md:flex-row flex-col mt-8 lg:justify-between border bg-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg">
            <DashboardOverview
                title="Total Products"
                amount={productCount}
                Icon = {FaBoxOpen}
            />

            <DashboardOverview
                title="Total Orders"
                amount={totalOrders}
                Icon = {FaShoppingCart}
            />

            <DashboardOverview
                title="Total Revenue"
                amount={totalRevenue}
                Icon = {FaDollarSign}
                revenue
            />
        </div>
    )
}
export default Dashboard
