import React from 'react'
import {FaExclamationTriangle} from "react-icons/fa";

const ErrorPage = ({message}) => {

    return (
        <div className="flex flex-col items-center justify-center px-6 py-14">
            <FaExclamationTriangle className="text-red-600 text-6xl mb-4 "/>
            <p className="text-gray-500 text-center mb-4">
                {message? message: "An unexpected error have occurred. "}
            </p>
        </div>
    )
}
export default ErrorPage
