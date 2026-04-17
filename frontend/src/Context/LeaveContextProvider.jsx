import { useState } from "react";
import { LeaveContext } from "./Context";

const LeaveContextProvider = ({ children }) => {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const [leaveBalance, setLeaveBalance] = useState({
    used: 0,
    remaining: 0,
    total: 20,
  });
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
