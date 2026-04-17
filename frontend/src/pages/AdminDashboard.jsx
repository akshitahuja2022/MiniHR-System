import React from "react";
import AllAttendance from "../Components/Admin/AllAttendence";
import LeaveRequests from "../Components/Admin/ApproveReject";

const AdminDashboard = () => {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 mt-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 px-6 py-10 text-center shadow-2xl shadow-slate-900/20 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-200 sm:text-base">
          Manage employees, track attendance, and control leave requests from
          one place with a clean, responsive dashboard.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-1">
        <LeaveRequests />
        <AllAttendance />
      </div>
    </main>
  );
};

export default AdminDashboard;
