import React from "react";
import { Link } from "react-router-dom";
import ViewHistoryLeave from "../Components/Employee/ViewHistoryLeave";
import LeaveBalanceSummary from "../Components/Employee/LeaveBalanceSummary";
import MarkedAttendence from "../Components/Employee/MarkedAttendence";
import MyAttendence from "../Components/Employee/MyAttendence";

const EmployeeDashboard = () => {
  return (
    <div className="bg-slate-50 pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-10 shadow-2xl shadow-slate-900/10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Employee Hub
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Welcome back, team member.
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                View your leave balance, submit attendance, and track your
                history from one responsive dashboard.
              </p>
            </div>

            <Link
              to="/leaveApply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100"
            >
              Apply Leave
            </Link>
          </div>
        </header>

        <main className="mt-10 grid gap-8 xl:grid-cols-1">
          <section className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/80">
                <h2 className="text-xl font-semibold text-slate-900">
                  Attendance
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Quickly mark today's attendance and keep your record updated.
                </p>
                <div className="mt-6 overflow-x-hidden">
                  <MarkedAttendence />
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/80">
                <h2 className="text-xl font-semibold text-slate-900">
                  Leave Balance
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Check your remaining casual, sick, and paid leave balances at
                  a glance.
                </p>
                <div className="mt-6">
                  <LeaveBalanceSummary />
                </div>
              </div>
            </div>

            <MyAttendence />

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/80">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Leave History
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Review your past leave requests, statuses, and details.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <ViewHistoryLeave />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
