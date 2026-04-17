import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";

const AllAttendance = () => {
  const { records, setRecords, loading, setLoading } = useContext(AdminContext);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/all`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();

        if (data.success) {
          setRecords(data.records);
        }
      } catch (error) {
        console.log("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [setLoading, setRecords]);

  if (loading) {
    return <p className="text-center py-8">Loading...</p>;
  }

  const attendanceRecords = records.filter(
    (item) => item.user?.fullName !== "Admin",
  );

  const statusClass = (status) => {
    const statusAttedence = (status || "").toLowerCase();
    if (statusAttedence === "present") return "bg-emerald-100 text-emerald-700";
    if (statusAttedence === "absent") return "bg-rose-100 text-rose-700";
    if (statusAttedence === "late") return "bg-amber-100 text-amber-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            All Attendance Records
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Attendance data for the full team.
          </p>
        </div>

        <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          {attendanceRecords.length} records
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {attendanceRecords.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendanceRecords.map((item, index) => (
                <tr
                  key={item._id}
                  className="transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-slate-900">
                    {item.user?.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {item.user?.email}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
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

export default AllAttendance;
