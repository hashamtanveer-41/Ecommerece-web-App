import api from "../../api/api.jsx";

export const fetchProducts = ()=>async (dispatch) =>{
    try{
        dispatch({type: "IS_FETCHING"})
        const {data} = await api.get(`/public/products`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPages: data.lastPages,
        });
        dispatch({type: "IS_SUCCESS"});
    }catch (error){
        console.log(error.message)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch",
        });
    }

};