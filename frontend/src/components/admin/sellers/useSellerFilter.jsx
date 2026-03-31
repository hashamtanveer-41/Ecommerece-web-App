import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import { getAllSellersDashboard} from "../../../store/action/index.js";

const UseSellerFilter = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams();
        const currentPage = searchParams.get("page")?
            Number(searchParams.get("page")):
            1;
        params.set("pageNumber", currentPage -1);
        const queryString = params.toString();
        dispatch(getAllSellersDashboard( queryString));
    }, [searchParams, dispatch]);
}
export default UseSellerFilter
