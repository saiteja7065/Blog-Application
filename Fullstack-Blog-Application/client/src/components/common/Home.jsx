

import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ColorContext";
import Loader from "../Loader";
import axios from "axios";

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isNightMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onRoleChange = async (e) => {
    setIsLoading(true);
    setError("");
    const role = e.target.value;
    setSelectedRole(role);

    try {
      let res;
      const userData = { ...currentUser, role };

      switch (role) {
        case "author":
          res = await axios.post(
            "http://localhost:3000/author-api/author",
            userData
          );
          break;
        case "user":
          res = await axios.post(
            "http://localhost:3000/user-api/user",
            userData
          );
          break;
        case "admin":
          res = await axios.post(
            "http://localhost:3000/admin-api/admincreate",
            userData
          );
          break;
        default:
          setError("Invalid role selected");
          return;
      }

      const { message, details, payload } = res.data;

      if (message === role || message === "admin") {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentuser", JSON.stringify({ ...currentUser, ...payload }));
        setError("");
        // Navigate based on role
        switch (role) {
          case "admin":
            navigate(`/admin-profile/${currentUser.email}`);
            break;
          case "author":
            navigate(`/author-profile/${currentUser.email}`);
            break;
          case "user":
            navigate(`/user-profile/${currentUser.email}`);
            break;
          default:
            break;
        }
      } else if (message === "Invalid Role") {
        setError(
          details || "This email is already registered with a different role"
        );
        setSelectedRole("");
      }
    } catch (err) {
      setError("An error occurred while processing your request");
      console.error("Role selection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`http://localhost:3000/admin-api/getuser/${currentUser.email}`)
        .then((res) => {
          if (res.status === 200) {
            setActive(res.data.payload.isActive);
          }
        })
        .catch(() => setActive(true));
    }
  }, [currentUser]);

  useEffect(() => {
    if (isSignedIn && user) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user?.lastName || "",
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-purple-200">
      {isSignedIn ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <img
            src={currentUser.profileImageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-gray-600 mt-2">{currentUser.email}</p>

          {active ? (
            <div className="flex justify-center space-x-6 py-4">
              {["author", "user", "admin"].map((role) => (
                <div key={role} className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    id={role}
                    value={role}
                    className="hidden peer"
                    onChange={onRoleChange}
                  />
                  <label
                    htmlFor={role}
                    className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500 text-[1.5rem]">
              Your account is inactive,please contact the admin
            </p>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-r from-blue-100 to-purple-200">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-serif">
            Welcome to Our Blog Platform
          </h1>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community to explore insightful articles, share your
            thoughts, and connect with like-minded individuals.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/signin")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-indigo-500/40"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors font-semibold text-lg shadow-lg hover:shadow-indigo-500/40"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default Home;
