import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.role !== "Admin");

  return (
    <section className="rounded-[2rem] w-full lg:max-w-6xl mx-auto border border-slate-200 bg-white p-5 mt-20 shadow-lg transition-shadow duration-300  sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            All Employees
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Active employees and leave balance summary.
          </p>
        </div>

        <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          {filteredUsers.length} employees
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Leave Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No employee records found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{user.fullName}</td>
                  <td className="px-4 py-3 text-slate-700">{user.email}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {user.leaveBalance}
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

export default AllUsers;
