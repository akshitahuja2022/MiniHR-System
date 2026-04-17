import React, { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { handleError, handleSuccess } from "../../notification/Notify";
import { useNavigate } from "react-router-dom";
import { LeaveContext } from "../../Context/Context";

const YourLeaves = () => {
  const navigate = useNavigate();
  const { leaves, setLeaves } = useContext(LeaveContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/leave/allLeaves`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();

        if (data.success) {
          setLeaves(data.leaves || []);
        } else {
          handleError(data.message);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [setLeaves]);

  //   cancel Leave
  const cancelLeave = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/cancel/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();
      console.log(data);
      if (data.success) {
        handleSuccess(data.message);
        setLeaves((prev) => prev.filter((leave) => leave._id !== id));
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Leaves</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-center text-gray-500">No leaves found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white rounded-xl shadow p-4 border"
            >
              <p className="font-semibold">{leave.leaveType.toUpperCase()}</p>

              <p className="text-sm text-gray-600">
                {new Date(leave.startDate).toLocaleDateString()} →{" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </p>

              <p className="text-sm mt-2 mb-2">Reason: {leave.reason}</p>

              <div className="flex justify-between">
                <p
                  className={`text-sm mt-2 mb-2 px-2 py-1 rounded-lg w-fit font-medium
    ${
      leave.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : leave.status === "approved"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
    }`}
                >
                  {leave.status}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate(`/updateLeave/${leave._id}`)}
                    className="p-2 sm:p-2.5 rounded-lg bg-blue-50 text-blue-600
      hover:bg-blue-100 active:scale-95 transition"
                  >
                    <MdEdit className="text-base sm:text-lg" />
                  </button>

                  <button
                    onClick={() => cancelLeave(leave._id)}
                    className="p-2 sm:p-2.5 rounded-lg bg-red-50 text-red-600
      hover:bg-red-100 active:scale-95 transition"
                  >
                    <MdDelete className="text-base sm:text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourLeaves;
