import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeaveContext } from "../../Context/LeaveContext";
import { handleError, handleSuccess } from "../../notification/Notify";

const EditLeaveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { leaveForm, setLeaveForm, loading, setLoading } =
    useContext(LeaveContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(leaveForm),
        },
      );

      const data = await res.json();

      if (data.success) {
        handleSuccess(data.message);
        navigate("/yourLeaves");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white py-8 px-4 sm:px-6 lg:px-10 mt-14">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_35px_60px_-35px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Edit your leave request
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Modify your leave details and save your changes. All fields below
              can be updated.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Leave type
                </span>
                <select
                  name="leaveType"
                  value={leaveForm.leaveType || ""}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a type</option>
                  <option value="casual">Casual</option>
                  <option value="sick">Sick</option>
                  <option value="paid">Paid</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Total days
                </span>
                <input
                  type="number"
                  name="totalDays"
                  value={leaveForm.totalDays || ""}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Start date
                </span>
                <input
                  type="date"
                  name="startDate"
                  value={leaveForm.startDate?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  End date
                </span>
                <input
                  type="date"
                  name="endDate"
                  value={leaveForm.endDate?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Reason</span>
              <textarea
                name="reason"
                value={leaveForm.reason || ""}
                onChange={handleChange}
                rows="5"
                className="mt-2 block w-full rounded-[1.75rem] border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => navigate("/yourLeaves")}
                className="rounded-full border-2 border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "  Updating..." : "Update Leave"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLeaveForm;
