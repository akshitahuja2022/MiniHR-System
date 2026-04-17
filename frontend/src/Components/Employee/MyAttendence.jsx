import React, { useContext, useEffect } from "react";
import { handleError } from "../../notification/Notify";
import { AttendanceContext } from "../../Context/Context";

const MyAttendence = () => {
  const { attendance, setAttendance, loading, setLoading } =
    useContext(AttendanceContext);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/attendence/my-attendence`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch attendance");
        }

        if (data.success) {
          setAttendance(data.attendence || []);
        } else {
          handleError(data.message);
        }
      } catch (error) {
        handleError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [setAttendance, setLoading]);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-4 sm:px-6 lg:px-10 py-8 mt-10 rounded-[2rem] shadow-md">
      {/* Header */}
      <h1 className="text-center text-white text-2xl sm:text-3xl font-bold mb-6">
        My Attendance
      </h1>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : attendance.length === 0 ? (
        <p className="text-center text-gray-500">No attendance found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attendance.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition"
            >
              {/* Date */}
              <p className="text-sm text-gray-600">
                {new Date(item.date).toDateString()}
              </p>

              {/* Status */}
              <div className="mt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-800">Status</span>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${
                      item.status === "present"
                        ? "bg-green-100 text-green-700"
                        : item.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Time */}
              <p className="text-xs text-gray-400 mt-2">
                Marked at: {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAttendence;
