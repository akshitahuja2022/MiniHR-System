import React, { useEffect, useState } from "react";

const ViewHistoryLeave = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/leave/leaveHistory`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();

        if (data.success) {
          setLeaveHistory(data.leaves || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Leave Request History
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-sm text-slate-600">
          Loading...
        </div>
      ) : leaveHistory.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
          No leave requests found.
        </div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-3">Type</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                  <th className="p-3">Days</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Applied</th>
                </tr>
              </thead>

              <tbody>
                {leaveHistory.map((leave) => (
                  <tr
                    key={leave._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-slate-900">
                      {leave.leaveType}
                    </td>

                    <td className="p-3 text-slate-700">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-slate-700">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-slate-700">{leave.totalDays}</td>

                    <td className="p-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          leave.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    <td className="p-3 text-slate-700">
                      {new Date(leave.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 sm:hidden">
            {leaveHistory.map((leave) => (
              <div
                key={leave._id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {leave.leaveType}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      leave.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-800">Start</span>
                    <span>
                      {new Date(leave.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-800">End</span>
                    <span>{new Date(leave.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-800">Days</span>
                    <span>{leave.totalDays}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-800">Applied</span>
                    <span>
                      {new Date(leave.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewHistoryLeave;
