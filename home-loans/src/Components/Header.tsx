import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { cartLength } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("accessToken");
  const totalCartItem = useSelector(cartLength);
  const [showDropDown,setShowDropDown] = useState(false)

  return (
    <div className="w-full bg-white shadow-md p-5 flex justify-between items-center h-[60px] ">
      <div>
        <img
          src="https://logos.flamingtext.com/Name-Logos/Surya-design-china-name.png"
          height="100px"
          width="100px"
        />
      </div>
      <ul className="flex gap-3 items-center">
        {!isLogin && (
          <>
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Register</NavLink>
            </li>
          </>
        )}
        {isLogin && (
          <li className="flex items-center gap-3">
            <button
              onClick={() => navigate("cart")}
              className="flex items-center text-gray-700 hover:text-black"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute top-3 right-14 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {totalCartItem}
              </span>
            </button>

            <button
              className="ml-3 cursor-pointer"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <FaUserCircle className="text-3xl" />
            </button>
            {showDropDown && (
              <div className="bg-white h-[200px] w-[180px] absolute top-12 right-4 shadow-md z-100 rounded-xl flex flex-col items-start justify-between p-3">
                <h2 className="text-stone-800 font-bold hover:bg-stone-200 p-1 rounded-md">
                  @Suryateja
                </h2>
                <div className="flex items-center gap-1  hover:bg-stone-200 p-1 rounded-md">
                  <IoIosSettings />
                  <p className="text-stone-800 font-semibold hover:bg-stone-200 p-1 rounded-md">
                    Settings
                  </p>
                </div>
                <div className="flex items-center gap-1 hover:bg-stone-200 p-1 rounded-md">
                  <FaUserEdit />
                  <p className="text-stone-800 font-semibold">Update Profile</p>
                </div>
                <button
                  className="py-1 px-6 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
                  onClick={() => {
                    toast.success("User Logout");
                    localStorage.removeItem("accessToken");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
