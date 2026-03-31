import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {dashboardCategoriesAction} from "../store/action/index.js";
export const useDashboardCategoryFilter = () => {
    const {user} = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams();
        const currentPage = searchParams.get("page")?
            Number(searchParams.get("page")):
            1;
        params.set("pageNumber", currentPage -1);
        const queryString = params.toString();
        dispatch(dashboardCategoriesAction( queryString,isAdmin));
    }, [searchParams, dispatch, isAdmin]);

}