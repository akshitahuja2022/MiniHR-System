import { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { handleError, handleSuccess } from "../notification/Notify";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, user, loading, setLoading } =
    useContext(AuthContext);

  const [isProfile, setIsProfile] = useState(false);
  const [active, setActive] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
      );
      const { message, success } = await response.json();
      if (success) {
        handleSuccess(message);
        setIsProfile(false);
        setIsLogin(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between h-16 items-center py-4 px-6  bg-white fixed top-0 left-0 right-0 z-50">
      <div className="cursor-pointer text-xl lg:text-2xl">
        <Link to="/" className="font-bold tracking-wide">
          HR<span className="text-blue-700">System</span>
        </Link>
      </div>

      <div className="hidden md:block">
        {isLogin ? (
          <button
            type="button"
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
            onClick={() => setIsProfile(!isProfile)}
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

      <div
        onClick={() => {
          setActive(!active);
          setIsProfile(false);
        }}
        className="md:hidden"
      >
        <IoMenu className="text-2xl mt-1 cursor-pointer" />
      </div>

      {active && (
        <div className="absolute right-8 top-14 w-44 h-68 shadow-lg rounded-md bg-white">
          <ul className="flex flex-col px-4 py-2 ">
            <div className="mt-5 cursor-pointer mb-5">
              {isLogin ? (
                <button
                  onClick={() => {
                    setActive(false);
                    setIsProfile(!isProfile);
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
      )}

      {isProfile && (
        <div className="absolute top-20 right-6 z-50 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 rounded-sm bg-white border-l border-t border-slate-200"></div>

          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-lg font-semibold">
              {user.fullName?.charAt(0) ?? "U"}
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Logged in as
              </p>
              <h2 className="text-base font-semibold text-slate-900">
                {user.fullName}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Email
              </p>
              <p className="text-sm font-medium text-slate-700 break-words">
                {user.email}
              </p>
            </div>

            <ul className="flex flex-col px-3 sm:px-4 py-2 space-y-2">
              <li>
                <Link
                  onClick={() => setIsProfile(false)}
                  to="/yourLeaves"
                  className="block rounded-lg px-4 py-2 text-sm sm:text-base font-medium text-black hover:bg-blue-800 hover:text-whitetransition duration-200"
                >
                  Your Leaves
                </Link>
              </li>
            </ul>

            <button
              onClick={handleLogout}
              className={`w-full rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800
  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
