import api from "../../api/api.jsx";
import toast from "react-hot-toast";

export const fetchProducts = (queryString)=>async (dispatch) =>{
    try{
        dispatch({type: "IS_FETCHING"})
        const {data} = await api.get(`/public/products?${queryString}`);
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

export const fetchCategories = (queryString)=>async (dispatch) =>{
    try{
        dispatch({type: "CATEGORY_LOADER"})
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPages: data.lastPages,
        });
        dispatch({type: "CATEGORY_SUCCESS"});
    }catch (error){
        console.log(error.message)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories.",
        });
    }

};

export const addToCart = (data, qty=1,toast ) =>
    (dispatch, getState) => {
        // Find the product
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        // Check for stocks

        const isQuantityExist = getProduct.quantity >= qty;

        // In stock -> add
        if (isQuantityExist){
            dispatch({type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else{
            // error
            toast.error("Out of stock");
        }
};

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the products
        const {products} = getState().products;
        console.log(data);
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        // Checking if quantity exists then only updating the product quantity
        const isQuantityExist = getProduct.quantity >= currentQuantity+1;
        if (isQuantityExist){
            const newQuantity = currentQuantity+1;
            // We update the quantity at three places
            // First at state
            setCurrentQuantity(newQuantity);
            // Then in redux store
            dispatch({
                type: 'ADD_CART',
                payload: {...data, quantity: newQuantity+1},
            });
            // Then in the local Storage
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else {
            toast.error("Quantity reached to limit.")
        }
};

export const decreaseCartQuantity = (data, newQuantity) =>
    (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const removeFromCart = (data, toast) =>
    (dispatch, getState) => {
        dispatch({
            type: "REMOVE_CART",
            payload: {...data, payload: data},
        })
        toast.success(`${data.productName} removed from the cart`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signin", sendData);
        dispatch({
            type: "LOGIN_USER",
            payload: data
        });
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login success");
        navigate("/")
    }catch (error){
        console.log(error);
        toast.error(error.response.data.message || "Internal Server Error");
    }finally {
        setLoader(false);
    }
}


export const authenticateRegisterNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signup", sendData);
        dispatch({
            type: "SIGNIN_USER",
            payload: data
        });
        reset();
        toast.success(data?.message  || "User register successfully");
        navigate("/login")
    }catch (error){
        console.log(error);
        navigate("/signup")
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
    }finally {
        setLoader(false);
    }
}

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({type: "LOG_OUT"});
  localStorage.removeItem("auth");
  navigate("/login");
};
