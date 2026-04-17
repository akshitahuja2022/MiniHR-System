import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Context";

const Hero = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Welcome to Smart HR Management System
        </h1>
        <p className="text-lg sm:text-lg text-gray-700 mb-8 font-medium">
          Manage your workforce efficiently with our all-in-one HR solution.
          Users can securely log in to their accounts, mark daily attendance
          with ease, apply for leaves in just a few clicks, and update or edit
          their information anytime. Stay organized, save time, and streamline
          all HR activities in one place with a smarter and more user-friendly
          system.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isLogin && (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

