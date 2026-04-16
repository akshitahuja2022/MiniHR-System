import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <div className="flex justify-between h-16 items-center py-4 px-6  bg-white fixed top-0 left-0 right-0 z-50">
      <div className="cursor-pointer text-xl lg:text-2xl">
        <Link to="/" className="font-bold tracking-wide">
          HR<span className="text-blue-700">System</span>
        </Link>
      </div>

      <div className="hidden md:block">
        {isLogin ? (
          <Link
            to="/"
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
          >
            Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>

      <div className="md:hidden">
        <IoMenu className="text-2xl mt-1 cursor-pointer" />
      </div>

      {/* {active && (
        <div className="absolute right-8 top-14 w-44 h-68 shadow-lg rounded-md bg-white">
          <ul className="flex flex-col px-4 py-2 ">
            <NavLink
              onClick={() => setActive(false)}
              to="/"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setActive(false)}
              to="/about"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setActive(false)}
              to="/destination"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              Destination
            </NavLink>
            <NavLink
              onClick={() => setActive(false)}
              to="/package"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              Package
            </NavLink>
            <NavLink
              onClick={() => setActive(false)}
              to="/booking"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              Booking
            </NavLink>
            <NavLink
              onClick={() => setActive(false)}
              to="/contact"
              className="text-md font-medium mt-2 cursor-pointer"
            >
              Contact
            </NavLink>

            <div className="mt-5 cursor-pointer mb-5">
              {isLogin ? (
                <button
                  onClick={() => {
                    setActive(false);
                    setProfile(!profile);
                  }}
                  className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
                >
                  Profile
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </ul>
        </div>
      )} */}

      {/* {profile && (
        <div className="absolute top-20 right-15 w-60 h-50 shadow-lg rounded-md bg-white">
          <div className="text-center mt-5 font-serif gap-10">
            <h2 className="text-xl text-center font-semibold">{user.name}</h2>
            <p className="text-md text-center mb-5">{user.email}</p>
            <div className="block border-t-2 border-blue-400">
              <NavLink
                onClick={() => {
                  setActive(false);
                  setProfile(false);
                }}
                to="/packageDetails"
                className="text-lg font-medium mt-2 cursor-pointer block"
              >
                Your Packages
              </NavLink>
            </div>

            <button
              onClick={handleLogout}
              className="bg-blue-700 mt-3 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
