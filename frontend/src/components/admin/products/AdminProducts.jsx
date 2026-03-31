import React from 'react'
import {MdAddShoppingCart} from "react-icons/md";

const AdminProducts = () => {
    const products = [ { "productId": 1, "productName": "iPhone 15 Pro", "image": "http://localhost:8080/images/iphone15.jpg", "quantity": 49, "price": 999.0, "discount": 5.0, "specialPrice": 949.05 }, { "productId": 2, "productName": "Samsung S24", "image": "http://localhost:8080/images/s24.jpg", "quantity": 30, "price": 1199.0, "discount": 10.0, "specialPrice": 1079.1 }, { "productId": 3, "productName": "Sony WH-1000XM5", "image": "http://localhost:8080/images/sony_hq.jpg", "quantity": 100, "price": 349.0, "discount": 0.0, "specialPrice": 349.0 }, { "productId": 4, "productName": "MacBook Air M3", "image": "http://localhost:8080/images/macbook.jpg", "quantity": 24, "price": 1099.0, "discount": 5.0, "specialPrice": 1044.05 }, { "productId": 5, "productName": "Dell XPS 15", "image": "http://localhost:8080/images/dellxps.jpg", "quantity": 15, "price": 1500.0, "discount": 10.0, "specialPrice": 1350.0 } ];
    const pagination = {"pageNumber": 0, "pageSize": 5, "totalElements": 50, "totalPages": 10, "lastPage": false}
    const emptyOrder = !products || products?.length === 0;

    return (
        <div >
            <div className="pt-6 pb-10 flex justify-end">
                <button className="bg-custom-blue  hover:bg-blue-800 text-white font-semibold flex items-center py-2 px-4 gap-2 rounded-md shadow-md transition-colors duration-300 hover:text-slate-300">
                    <MdAddShoppingCart className="text-xl" />
                    Add Product
                </button>
            </div>
        </div>
    )
}
export default AdminProducts
