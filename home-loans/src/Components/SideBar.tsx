import { NavLink } from "react-router-dom";
import { FaHome, FaDollyFlatbed, FaCartPlus } from "react-icons/fa";
import { AiOutlineBoxPlot } from "react-icons/ai";

const navItems = [
  { to: "home", label: "Homes", icon: <FaHome /> },
  { to: "plot", label: "Plots", icon: <AiOutlineBoxPlot /> },
  { to: "flat", label: "Flats", icon: <FaDollyFlatbed /> },
  { to: "cart", label: "Cart", icon: <FaCartPlus /> },
];

const SideBar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-xl p-6 mt-1">
      <nav>
        <ul className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-lg transition-all duration-200
                   ${
                     isActive
                       ? "bg-blue-100 text-blue-700 font-semibold"
                       : "text-gray-700 hover:bg-gray-100"
                   }`
                }
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
