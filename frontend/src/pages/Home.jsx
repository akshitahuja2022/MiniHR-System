import { useContext } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Hero from "../Components/Hero";
import AdminDashboard from "./AdminDashboard";
import { AuthContext } from "../Context/Context";

const Home = () => {
  const { isLogin, user } = useContext(AuthContext);
  return (
    <div>
      {isLogin ? (
        user.role === "Admin" ? (
          <AdminDashboard />
        ) : (
          <EmployeeDashboard />
        )
      ) : (
        <Hero />
      )}
    </div>
  );
};

export default Home;
