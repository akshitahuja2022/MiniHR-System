import React, { useContext } from "react";
import { handleError, handleSuccess } from "../../notification/Notify";
import { LeaveContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const ApplyLeaveForm = () => {
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

      const payload = {
        leaveType: leaveForm.leaveType,
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Signup failed");
      }

      const { message, success } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/yourLeaves");
        }, 1000);
        setLeaveForm({
          leaveType: leaveForm.leaveType,
          startDate: leaveForm.startDate,
          endDate: leaveForm.endDate,
          reason: leaveForm.reason,
        });
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="rounded-2xl bg-white p-5 sm:p-7 lg:p-8 shadow-xl ring-1 ring-slate-200">
          {/* Header */}
          <div className="text-center">
            <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
              Apply for Leave
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Fill details and submit for approval
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
            {/* Leave Type + Days */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <select
                name="leaveType"
                value={leaveForm.leaveType}
                onChange={handleChange}
                className="w-full rounded-xl border p-2.5 sm:p-3 text-sm focus:ring-2 focus:ring-blue-100"
                defaultValue="casual"
              >
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
                <option value="paid">Paid</option>
              </select>

              <input
                type="number"
                name="totalDays"
                placeholder="Total Days"
                className="w-full rounded-xl border p-2.5 sm:p-3 text-sm focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="date"
                name="startDate"
                value={leaveForm.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border p-2.5 sm:p-3 text-sm"
              />

              <input
                type="date"
                name="endDate"
                value={leaveForm.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border p-2.5 sm:p-3 text-sm"
              />
            </div>

            {/* Reason */}
            <textarea
              name="reason"
              value={leaveForm.reason}
              onChange={handleChange}
              rows="3"
              placeholder="Reason for leave..."
              className="w-full rounded-xl border p-2.5 sm:p-3 text-sm resize-none focus:ring-2 focus:ring-blue-100"
            />

            {/* Button */}
            <button
              type="submit"
              className={`w-full rounded-xl bg-blue-600 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-blue-700
              active:scale-[0.99] transition"
               ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
