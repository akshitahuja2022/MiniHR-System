import React, { useContext } from "react";
import { handleError, handleSuccess } from "../../notification/Notify";
import { AttendanceContext } from "../../Context/Context";

const MarkedAttendence = () => {
  const { setAttendance, status, setStatus, loading, setLoading } =
    useContext(AttendanceContext);

  const handleMark = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendence/marked`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      if (data.success) {
        handleSuccess(data.message);
        setAttendance((prev) => [data.attendance, ...prev]);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-lg lg:max-w-sm">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35)] ring-1 ring-slate-200">
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-8 sm:px-3 sm:py-6">
            <h2 className="text-3xl font-semibold text-center text-white sm:text-2xl">
              Mark Attendance
            </h2>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-8">
            <form onSubmit={handleMark} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Attendance status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>

              <button
                disabled={loading}
                className={`w-full rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-50 ${loading ? "bg-sky-300 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"}`}
              >
                {loading ? "Marking..." : "Mark Attendance"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkedAttendence;
