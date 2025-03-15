import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../../font.css'
import { ThemeContext } from '../../contexts/ColorContext'; // Import ThemeContext

function AdminDash() {
    const { isNightMode } = React.useContext(ThemeContext); // Access theme context
  return (
    <div className={`author-profile p-6 ${isNightMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
    <ul className="flex justify-around text-lg font-semibold fontly">
      <li>
        <NavLink
          to="articles"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : `${isNightMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`
            }`
          }
        >
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : `${isNightMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`
            }`
          }
        >
            All Users
        </NavLink>
      </li>
    </ul>

    <div className="mt-5 p-4 text-center">
      <Outlet />
    </div>
  </div>
  )
}

export default AdminDash