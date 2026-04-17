import React, { useContext, useEffect } from "react";
import { LeaveContext } from "../../Context/Context";

const LeaveBalanceSummary = () => {
  const { leaveBalance, setLeaveBalance, user } = useContext(LeaveContext);

  useEffect(() => {
    if (!user) return;
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/leave/balance`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (data?.balance) {
          setLeaveBalance(data.balance);
        } else {
          setLeaveBalance({ used: 0, remaining: 0, total: 20 });
        }
      } catch (err) {
        console.error(err);
        setLeaveBalance({ used: 0, remaining: 0, total: 20 });
      }
    };

    setTimeout(() => {
      fetchBalance();
    }, 300);
  }, [setLeaveBalance, user]);

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Leave Balance Summary
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-5 bg-blue-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Used</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">
              {leaveBalance?.used || 0}
            </p>
          </div>

          <div className="text-center p-4 sm:p-5 bg-green-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Remaining</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {leaveBalance?.remaining || 0}
            </p>
          </div>

          <div className="text-center p-4 sm:p-5 bg-gray-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Total Balance</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-600">
              {leaveBalance?.total || 20}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceSummary;
