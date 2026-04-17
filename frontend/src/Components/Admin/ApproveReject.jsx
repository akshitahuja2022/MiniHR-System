import React, { useContext, useEffect } from "react";
import { LeaveContext } from "../../Context/Context";
import { handleError } from "../../notification/Notify";

const LeaveRequests = () => {
  const { leaves, setLeaves } = useContext(LeaveContext);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/leaves`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setLeaves(data.leaves);
      }
    };

    fetchLeaves();
  }, [setLeaves]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/leave/approve/${id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        setLeaves((prev) =>
          prev.map((leave) =>
            leave._id === id ? { ...leave, status: "approved" } : leave,
          ),
        );
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/leave/reject/${id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        setLeaves((prev) =>
          prev.map((leave) =>
            leave._id === id ? { ...leave, status: "rejected" } : leave,
          ),
        );
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Leave Requests
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review pending leave requests and take action quickly.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[1.75rem] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Days</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No leave requests available.
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-slate-900">
                    {leave.user?.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {leave.totalDays}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        leave.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : leave.status === "rejected"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {leave.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(leave._id)}
                            className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(leave._id)}
                            className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-slate-500">
                          No action
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaveRequests;
