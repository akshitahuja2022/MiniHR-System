import { useState } from "react";
import { AdminContext } from "./AdminContext";

const AdminContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        records,
        setRecords,
        loading,
        setLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
