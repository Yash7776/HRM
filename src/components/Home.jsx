import React from "react";

const Home = () => {
  return (
    <div className="p-7 bg-gray-100">
      <div className="mx-auto px-4 max-w-screen-xl mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
            <i
              data-lucide="users"
              className="w-10 h-10 text-blue-500 mb-3"
            ></i>
            <h2 className="text-lg font-semibold">Total Employees</h2>
            <p className="text-3xl font-bold mt-2">152</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
            <i
              data-lucide="clock"
              className="w-10 h-10 text-green-500 mb-3"
            ></i>
            <h2 className="text-lg font-semibold">Today's Attendance</h2>
            <p className="text-3xl font-bold mt-2">134</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
            <i
              data-lucide="calendar"
              className="w-10 h-10 text-yellow-500 mb-3"
            ></i>
            <h2 className="text-lg font-semibold">Pending Leave Requests</h2>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
            <i
              data-lucide="dollar-sign"
              className="w-10 h-10 text-red-500 mb-3"
            ></i>
            <h2 className="text-lg font-semibold">This Month's Payroll</h2>
            <p className="text-3xl font-bold mt-2">₹5.2L</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-blue-500 text-white py-4 text-lg rounded-xl hover:bg-blue-600 transition">
              View Employees
            </button>
            <button className="bg-green-500 text-white py-4 text-lg rounded-xl hover:bg-green-600 transition">
              Manage Attendance
            </button>
            <button className="bg-yellow-500 text-white py-4 text-lg rounded-xl hover:bg-yellow-600 transition">
              Process Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;