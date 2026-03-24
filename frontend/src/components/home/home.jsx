import HeroBanner from "./HeroBanner.jsx";
import ProductCard from "../shared/ProductCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/action/index.js";
import {useEffect} from "react";
import Loader from "../shared/Loader.jsx";
import {FaExclamationTriangle} from "react-icons/fa";

const home = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);

    useEffect(()=>{
        dispatch(fetchProducts());
    }, [dispatch]);

    const {isLoading, errorMessage} = useSelector(
        (state) => state.errors
    );
    return (
        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner/>
            </div>
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold"> Products </h1>
                        <span className="text-slate-800">
                            Discover our handpicked selection of top-rated items
                        </span>
                </div>
                {isLoading?(
                    <Loader/>
                ): errorMessage? (
                    <div className='flex justify-center items-center h-50'>
                        <FaExclamationTriangle className='text-slate-800 text-3xl mr-2 '/>
                        <span className='text-slate-800 text-lg font-medium'>
                      {errorMessage}
                  </span>
                    </div>
                    ): (

            <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6'>
                {products &&
                    products?.slice(0, 8)
                        .map((item, i) => (
                            <ProductCard key={i} {...item}/>
                        ))
                }
            </div>
                )}
        </div>
        </div>
    );
}

export default home;