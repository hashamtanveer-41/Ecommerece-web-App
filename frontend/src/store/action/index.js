import api from "../../api/api.jsx";

export const fetchProducts = ()=>async (dispatch) =>{
    try{
        const {data} = await api.get(`/public/products`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPages: data.lastPages,
        })
    }catch (error){
        console.log(error.message)
    }

}