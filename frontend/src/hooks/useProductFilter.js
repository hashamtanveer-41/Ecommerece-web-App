import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {dashboardProductsAction, fetchProducts} from "../store/action/index.js";
import {useDispatch, useSelector} from "react-redux";

const useProductFilter = () =>{
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")?
            Number(searchParams.get("page")):
            1;
        params.set("pageNumber", currentPage -1);

        const sortOrder = searchParams.get("sortby" )|| "asc";
        const categoryParams = searchParams.get("category" )|| null;
        const keyword = searchParams.get("keyword" )|| null;
        params.set("sortby", "price");
        params.set("sortOrder", sortOrder);

        if (categoryParams){
            params.set("category", categoryParams);
        }

        if (keyword){
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        console.log("QUERY_STRING", queryString);

        dispatch(fetchProducts(queryString));
    }, [dispatch, searchParams]);
};
export const useDashboardProductFilter = () => {
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
        dispatch(dashboardProductsAction( queryString,isAdmin));
    }, [searchParams, dispatch, isAdmin]);

}

export default useProductFilter;