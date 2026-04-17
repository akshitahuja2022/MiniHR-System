import { useState } from "react";
import { AttendanceContext } from "./AttendenceContext";

const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("present");

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        setAttendance,
        loading,
        status,
        setStatus,
        setLoading,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
