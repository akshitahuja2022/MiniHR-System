import { useContext } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Hero from "../Components/Hero";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <div>
      {!isLogin && <Hero />}

      <EmployeeDashboard />
    </div>
  );
};

export default Home;
