import { useState } from "react";
import { LeaveContext } from "./LeaveContext";

const LeaveContextProvider = ({ children }) => {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const [leaveBalance, setLeaveBalance] = useState([]);
  return (
    <LeaveContext.Provider
      value={{
        leaveForm,
        setLeaveForm,
        leaves,
        setLeaves,
        loading,
        setLoading,
        leaveBalance,
        setLeaveBalance,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContextProvider;
