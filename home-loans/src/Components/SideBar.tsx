import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { AiOutlineBoxPlot } from "react-icons/ai";
import { FaDollyFlatbed } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";


const SideBar = () => {
  return (
    <div className="bg-white-400 w-[20%] shadow-2xl flex justify-center p-5">
      <ul className="flex flex-col gap-10">
        <li className="flex items-center gap-4 hover:bg-stone-300 px-5 rounded-2xl">
          <FaHome className="text-xl" />
          <NavLink to="home" className="text-stone-800 font-bold text-xl">
            Home
          </NavLink>
        </li>
        <li className="flex items-center gap-4 hover:bg-stone-300 px-5 rounded-2xl">
          <AiOutlineBoxPlot className="text-xl" />
          <NavLink to="plot" className="text-stone-800 font-bold text-xl">
            Plots
          </NavLink>
        </li>
        <li className="flex items-center gap-4 hover:bg-stone-300 px-5 rounded-2xl">
          <FaDollyFlatbed className="text-xl" />
          <NavLink to="flat" className="text-stone-800 font-bold text-xl">
            Flats
          </NavLink>
        </li>
        <li className="flex items-center gap-4 hover:bg-stone-300 px-5 rounded-2xl">
          <FaCartPlus className="text-xl" />
          <NavLink to="cart" className="text-stone-800 font-bold text-xl">
            Cart
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar