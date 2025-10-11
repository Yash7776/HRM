import React, { useContext, useState } from "react";
import {
  Users,
  Building2,
  FolderKanban,
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContex.jsx";

export default function Base() {
  const { logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null); // for submenu toggle

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSubmenuToggle = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const menuItems = [
    {
      name: "Employees",
      icon: <Users />,
      link: "/employees",
      subMenu: [
        { name: "Add New Employee", link: "/employess/add" },
        { name: "View All Employees", link: "/employess" },
      ],
    },
    { name: "Departments", icon: <Building2 />, link: "/departments" },
    { name: "Projects", icon: <FolderKanban />, link: "/projects" },
    { name: "Attendance", icon: <CalendarDays />, link: "/attendance" },
    { name: "Settings", icon: <Settings />, link: "/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 h-screen p-5 pt-8 relative duration-300 text-gray-200`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
      >
        <Menu size={18} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="logo"
          className="w-10 h-10"
        />
        <h1
          className={`text-xl font-bold origin-left duration-200 ${
            !isOpen && "scale-0"
          }`}
        >
          HR Management
        </h1>
      </div>

      {/* Menu Items */}
      <ul className="pt-6">
        {menuItems.map((menu, index) => (
          <li key={index} className="mb-2">
            {menu.subMenu ? (
              <>
                {/* Main Menu with Dropdown */}
                <button
                  onClick={() => handleSubmenuToggle(menu.name)}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    {menu.icon}
                    <span
                      className={`${!isOpen && "hidden"} origin-left duration-200`}
                    >
                      {menu.name}
                    </span>
                  </div>
                  {isOpen &&
                    (openSubmenu === menu.name ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </button>

                {/* Submenu Items */}
                {openSubmenu === menu.name && isOpen && (
                  <ul className="pl-10 mt-1 space-y-1">
                    {menu.subMenu.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={sub.link}
                          className="block p-2 text-sm rounded-md hover:bg-gray-700"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={menu.link}
                className="flex items-center gap-3 p-2 text-sm rounded-md cursor-pointer hover:bg-gray-700"
              >
                {menu.icon}
                <span
                  className={`${!isOpen && "hidden"} origin-left duration-200`}
                >
                  {menu.name}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Logout Section */}
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          onClick={logoutUser}
          className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-red-600 transition"
        >
          <LogOut />
          <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
