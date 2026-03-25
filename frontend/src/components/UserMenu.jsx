import {Button} from "@headlessui/react";
import {Avatar, Menu, MenuItem} from "@mui/material";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingCart} from "react-icons/fa";
import {IoExit, IoExitOutline} from "react-icons/io5";
import Backdrop from "./Backdrop.jsx";
import {logoutUser} from "../store/action/index.js";
import truncateText from "../utils/truncateText.jsx";

const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {user} = useSelector((state) => state.auth);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOutHandler = () => {
        dispatch(logoutUser(navigate));
    }

    return (
        <div className="relative z-30">
            <div
                className="sm:border sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition duration-300 text-slate-700"
                onClick={handleClick}
            >
                <Avatar alt="Menu" src=""/>
            </div>
            <Menu
                sx={{width: "400px"}}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                        sx: {width: "160px"},
                    },
                }}
            >
                <Link to="/profile">
                    <MenuItem className="flex gap-2" onClick={handleClose}>
                        <BiUser className="text-xl"/>
                        <span className="font-bold text-[16px] mt-1">
                            {truncateText(user?.username, 8)}
                        </span>
                    </MenuItem>
                </Link>

                <Link to="/profile/orders">
                    <MenuItem className="flex gap-2" onClick={handleClose}>
                        <FaShoppingCart className="text-xl"/>
                        <span className="font-semibold">
                            Order
                        </span>
                    </MenuItem>
                </Link>

                    <MenuItem className="flex gap-2" onClick={logOutHandler}>
                        <div
                            className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-2 rounded-md text-white ">
                            <IoExitOutline className="text-xl"/>
                            <span className="font-semibold">
                                LogOut
                            </span>
                        </div>
                    </MenuItem>
            </Menu>

            {open && <Backdrop />}

        </div>
    );
}

export default UserMenu;