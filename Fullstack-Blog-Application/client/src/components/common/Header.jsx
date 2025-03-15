// Header.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../font.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useClerk, useUser } from "@clerk/clerk-react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { ThemeContext } from "../../contexts/ColorContext"; // Import ThemeContext

export default function Header() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const { isNightMode, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  const handleSignOut = async (e) => {
    await signOut();
    setCurrentUser(null);
    e.preventDefault();
    navigate("/");
  };

  return (
    <header
      className={`${
        isNightMode ? "bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.4)] border-b border-gray-700" : "bg-[#F5F5F5] text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
      } shadow fontly`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="p-1.5 w-auto">
            <span className="sr-only">Your Company</span>
            <img
              alt="Company Logo"
              src="https://iili.io/3dYEAL7.png"
              className="h-10 w-[100%] object-contain self-center grow-0 "
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm/6 font-semibold hover:text-indigo-600"
          >
            Home
          </Link>
          {!isSignedIn && (
            <>
              <Link
                to="/signup"
                className="text-sm/6 font-semibold hover:text-indigo-600"
              >
                Sign Up
              </Link>
              <Link
                to="/about"
                className="text-sm/6 font-semibold hover:text-indigo-600"
              >
                About Us
              </Link>
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isSignedIn ? (
            <div className="flex justify-center align-middle gap-6">
              <button
                onClick={handleSignOut}
                className="text-sm/6 font-semibold hover:text-indigo-600"
              >
                Sign Out
              </button>
              <div className="flex flex-col items-center justify-end gap-0.5">
                <img
                  src={currentUser.profileImageUrl}
                  className="rounded-2xl w-8 h-8"
                />
                <p className="text-[0.8rem] text-center">
                  {currentUser.firstName} <br /> <hr />
                  {currentUser.role}
                </p>
              </div>
            </div>
          ) : (
            <Link
              to="/signin"
              className="text-sm/6 font-semibold hover:text-indigo-600"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {/* Theme Toggle Switch */}
         <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors mx-1 ${
              isNightMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-500' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isNightMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://iili.io/3dYEAL7.png"
                className="h-5 w-auto "
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {isSignedIn && (
                  <div className="flex items-center gap-3 sm:px-2 md:px-3">
                    <img
                      src={currentUser.profileImageUrl}
                      className="rounded-4xl w-13 h-13"
                    />
                    <p className="text-[1.2rem]">{currentUser.firstName}</p>
                  </div>
                )}
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                {!isSignedIn && (
                  <>
                    <Link
                      to="/about"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/signup"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
              <div className="py-6">
                {isSignedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
