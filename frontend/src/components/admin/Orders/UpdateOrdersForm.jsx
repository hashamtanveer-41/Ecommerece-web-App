import React, {useState} from 'react'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {Button} from "@headlessui/react";
import Spinners from "../../shared/Spinners.jsx";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {updateOrderStatusFromDashboard} from "../../../store/action/index.js";

const ORDER_STATUSES= [
    "Pending",
    "Processing",
    "Delivered",
    "Cancelled",
    "Accepted"
]

const UpdateOrdersForm = ({ setOpen, selectedId, selectedItem, loader, setLoader}) => {
    const [orderStatus, setOrderStatus]= useState(selectedItem?.status || "Accepted");
    const [error, setError]= useState("");
    const dispatch = useDispatch()


    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus){
            setError("Order status is required!!")
            return;
        }
        dispatch(updateOrderStatusFromDashboard(
            selectedId,
            orderStatus,
            toast,
            setLoader
        ));
    }
    return (
        <div className="py-5 relative h-full">
            <form className="space-y-4" onSubmit={updateOrderStatus}>
                <FormControl fullWidth variant="outlined" error={!!error}>
                    <InputLabel>Order Status</InputLabel>
                    <Select
                        labelId="order-status-label"
                        label="Order Status"
                        value={orderStatus}
                        onChange={(e)=> {
                            setOrderStatus(e.target.value)
                            setError("")
                        }}
                    >
                        {
                            ORDER_STATUSES.map((status)=>(
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {error && <FormHelperText >{error}</FormHelperText>}
                </FormControl>

                <div className="w-full flex justify-between items-center absolute bottom-15">
                    <Button disabled={loader}
                        onClick={()=>setOpen(false)}
                            variant="outlined"
                            className="text-slate-700 border border-slate-400 rounded-md px-4 py-2.5 text-sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loader}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="bg-custom-blue rounded-md text-white px-4 py-2.5 text-sm"
                    >
                        {loader?(
                            <div className="flex gap-2 items-center">
                                <Spinners /> Loading...
                            </div>
                        ):(
                            "Update"
                        )}
                    </Button>

                </div>
            </form>
        </div>
    )
}
export default UpdateOrdersForm
