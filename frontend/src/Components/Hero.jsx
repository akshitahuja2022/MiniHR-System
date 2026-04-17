import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Context";

const Hero = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Track Attendance. Apply Leave. Stay Organized.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 font-medium">
          Smarter HR Management Starts Here!
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
