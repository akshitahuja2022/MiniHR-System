import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeaveForm from "./Components/Employee/ApplyLeaveForm";
import YourLeaves from "./Components/Employee/YourLeaves";
import EditLeaveForm from "./Components/Employee/EditLeaveForm";
import MyAttendence from "./Components/Employee/MyAttendence";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/leaveApply" element={<ApplyLeaveForm />} />
        <Route path="/yourLeaves" element={<YourLeaves />} />
        <Route path="/updateLeave/:id" element={<EditLeaveForm />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
