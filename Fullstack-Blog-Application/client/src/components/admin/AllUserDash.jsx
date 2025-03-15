import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../contexts/ColorContext";
import "../../font.css";

const UserCard = ({ user, onToggle }) => {
  const { isNightMode, toggleTheme } = useContext(ThemeContext); 

  return (
    <div
      className={`${
        isNightMode
          ? "bg-gray-800 border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          : "bg-white border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
      } rounded-xl p-6 w-80 flex flex-col items-center border transition-all duration-300 backdrop-blur-sm`}
    >
      <div className={`relative mb-4 group`}>
        <div
          className={`absolute inset-0 rounded-full ${
            isNightMode ? "bg-blue-500" : "bg-indigo-500"
          } blur-md opacity-20 group-hover:opacity-30 transition-opacity`}
        ></div>
        <img
          src={user.profileImageUrl}
          alt={user.firstName}
          className="w-24 h-24 rounded-full object-cover relative z-10 border-2 border-opacity-20 group-hover:scale-105 transition-transform"
        />
      </div>

      <h2
        className={`text-xl font-semibold mb-2 ${
          isNightMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {user.firstName} {user.lastName}
      </h2>

      <p
        className={`text-sm mb-4 ${
          isNightMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {user.email}
      </p>

      <button
        onClick={() => onToggle(user._id, !user.isActive)}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 
          ${
            user.isActive
              ? `${
                  isNightMode
                    ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`
              : `${
                  isNightMode
                    ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`
          }
        `}
      >
        {user.isActive ? "Block User" : "Activate User"}
      </button>
    </div>
  );
};

const AllUserDash = () => {
  const [users, setUsers] = useState([]);
  const { isNightMode, toggleTheme } = useContext(ThemeContext); 

  useEffect(() => {
    fetch("http://localhost:3000/admin-api/getallusers")
      .then((res) => res.json())
      .then((data) => setUsers(data.payload));
  }, []);

  const toggleStatus = (user) => {
    const xfact = {
      isActive: !user.isActive,
    };

    axios
      .put(`http://localhost:3000/admin-api/updateuser/${user._id}`, xfact)
      .then((res) => {
        if (res.status === 200) {
          setUsers(
            users.map((u) =>
              u._id === user._id ? { ...u, isActive: !u.isActive } : u
            )
          );
        }
      });
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        isNightMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 ${
            isNightMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          User Management
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onToggle={() => toggleStatus(user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUserDash;
