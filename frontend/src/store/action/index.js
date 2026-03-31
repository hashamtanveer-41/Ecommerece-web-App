import api from "../../api/api.jsx";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

export const fetchCategories = ()=>async (dispatch) =>{
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

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) =>
     async (dispatch, getState) => {
     const {user} = getState().auth;
    dispatch({type: "BUTTON_LOADER"});
    try {
        if (!addressId){
            const {data} = await api.post("/addresses", sendData);
        }else{
            const {data} = await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getAllAddresses());
        toast.success("Address saved successfully");
        dispatch({type: "IS_SUCCESS"});
    }catch (error){
        console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        dispatch({type: "IS_ERROR", payload: null});
    }finally {
        setOpenAddressModal(false);
    }
}

export const getAllAddresses = (queryString)=>async (dispatch, getState) =>{
    try{
        dispatch({type: "IS_FETCHING"})
        const {data} = await api.get(`/users/addresses`);
        dispatch({
            type: "USER_ADDRESS",
            payload: data
        });
        dispatch({type: "IS_SUCCESS"});
    }catch (error){
        console.log(error.message)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user's addresses.",
        });
    }

};

export const selectUserAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address))
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
}

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) =>
   async (dispatch, getState) => {
       dispatch({type: "BUTTON_LOADER"});
       try {
            await api.delete(`/addresses/${addressId}`);
           dispatch({type: "USER_ADDRESS"});
           dispatch(getAllAddresses());
           toast.success("Address deleted successfully");
            dispatch(clearCheckoutAddress);
           dispatch({type: "IS_SUCCESS"});
       }catch (error){
           console.log(error);
           toast.error(error?.response?.data?.message || error?.response?.data?.password || "Failed to delete the address");
           dispatch({type: "IS_ERROR", payload: null});
       }finally {
           setOpenDeleteModal(false);
       }
}

export const clearCheckoutAddress= () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
}

export const addPaymentMethod= (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};


export const getUserCart = () =>
    async  (dispatch, getState) => {
        try {
            dispatch({type: "IS_FETCHING"});
            const {data} = await api.get('/carts/users/cart');

            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId
            })
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            dispatch({type: "IS_SUCCESS"});
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch cart items",
            });
        }
    }


export const createStripePaymentSecret =
    (sendData) =>
        async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.post("/order/stripe-client-secret", sendData);
        const clientSecret = data?.clientSecret ?? data;
        dispatch({type: "CLIENT_SECRET_KEY", payload: clientSecret});
        localStorage.setItem("clientSecret", JSON.stringify(clientSecret));
        dispatch({type: "IS_SUCCESS"});
    }catch (error){
        console.log(error);
        toast.error(error?.response?.data?.message ||"Failed to create Client secret");
        dispatch({type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to create Client secret"});
    }
}



export const stripePaymentConfirmation =
    (sendData, setErrorMessage, setLoading, toast) =>
        async (dispatch, getState) => {
            try {
                const response = await api.post("/order/users/payments/online   ", sendData);
                if (response.data){
                    localStorage.removeItem("CHECKOUT_ADDRESS");
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("clientSecret");
                    dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS"});
                    dispatch({type: "CLEAR_CART"});
                    toast.success("Order Accepted");
                }else{
                    setErrorMessage("Payment Failed. Please try again")
                }
            }catch (error){
                setErrorMessage("Payment Failed. Please try again")

            }
        }
export const analyticsAction = ()=>async (dispatch, getState) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get("/admin/app/analytics")
        dispatch({
            type: "FETCH_ANALYTICS",
            payload: data,
        })
        dispatch({type: "IS_SUCCESS"});
    }catch (error){
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch data",
        });
    }
}

export const getOrdersForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/admin/orders?${queryString}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders",
        });
    }
};

export const  updateOrderStatusFromDashboard = (orderId, orderStatus, toast, setLoader) => async (dispatch, getState) => {
    try {
        setLoader(true)
        const {data} = await  api.put(`/admin/orders/${orderId}/status` , {status: orderStatus})
        toast.success(data.message || "Order updated Successfully")
        await dispatch(getOrdersForDashboard());
    }catch (error){
        console.log(error)
        toast.error(error?.response?.data?.message || "Internal Server Error")
    }finally {
        setLoader(false)
    }
}

export const dashboardProductsAction = (queryString ="", isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
        });
    }
};

export const updateProductFromDashboard =
    (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.put(`/admin/products/${sendData.id}`, sendData);
        toast.success("Product update successfully");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    }catch (error){
        toast.error(error?.response?.message || "Product update failed");
    }

}
export const addNewProductFromDashboard = (
    sendData, toast,reset,setLoader, setOpen
) =>  async (dispatch, getState) => {
    try {
        setLoader(true)
        await api.post(`/admin/categories/${sendData.categoryId}/product` ,sendData)
        toast.success("Product created successfully");
        setOpen(false)
        reset();
        await dispatch(dashboardProductsAction());
    }catch (error){
        console.log(error)
        toast.error(error?.response?.data?.description || "Failed to create Product")
    }finally {
        setLoader(false)
    }
}

export const deleteProductFromDashboard = (setLoader, productId, toast,setOpenDeleteModal) =>
     async (dispatch) => {
     try {
         setLoader(true);
         await api.delete(`/admin/products/${productId}`);
         toast.success("Product deleted successfully")
         await dispatch(getOrdersForDashboard());
     }catch (error){
         console.log(error);
         toast.error(error?.response?.data?.message|| "Failed to delete the product");
     }finally {
         setLoader(false)
         setOpenDeleteModal(false);
     }
}

export const updateProductImageFromDashboard =
    (formData, productId, toast, setLoader, setOpen) => async (dispatch) => {
        try {
            setLoader(true);
            await api.put(`/admin/products/${productId}/image`, formData);
            toast.success("Image upload successfully");
            await dispatch(getOrdersForDashboard());
        }catch (error){
            toast.error(error?.response?.message || "Product Image upload failed");
        }finally {
            setLoader(false);
            setOpen(false);
        }

}

export const dashboardCategoriesAction = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = "/public/categories";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard categories",
        });
    }
};

export const deleteCategoryFromDashboard = (setLoader, categoryId, toast,setOpenDeleteModal) =>
    async (dispatch) => {
        try {
            setLoader(true);
            await api.delete(`/admin/categories/${categoryId}`);
            toast.success("Category deleted successfully")
            await dispatch(dashboardCategoriesAction());
        }catch (error){
            console.log(error);
            toast.error(error?.response?.data?.message|| "Failed to delete the category");
        }finally {
            setLoader(false)
            setOpenDeleteModal(false);
        }
}

export const addNewCategoryFromDashboard = (
    sendData, toast,reset,setLoader, setOpen
) =>  async (dispatch) => {
    try {
        setLoader(true)
        await api.post(`/admin/categories` ,sendData)
        toast.success("Category created successfully");
        setOpen(false)
        reset();
        await dispatch(dashboardCategoriesAction());
    }catch (error){
        console.log(error)
        toast.error(error?.response?.data?.description || "Failed to create Category")
    }finally {
        setLoader(false)
    }
}

export const updateCategoryFromDashboard =
    (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
        try {
            setLoader(true);
            await api.put(`/admin/categories/${sendData.id}`, sendData);
            toast.success("Category updated successfully");
            reset();
            setLoader(false);
            setOpen(false);
            await dispatch(dashboardCategoriesAction());
        }catch (error){
            toast.error(error?.response?.message || "Category update failed");
        }

    }