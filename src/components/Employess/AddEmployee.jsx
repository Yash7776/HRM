import React, { useState } from "react";

const AddEmployee = () => {
  

  

  

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white text-center">
            Add New Employee
          </h1>

          <form className="space-y-6">
            {/* Row 1: First Name + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter first name"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter last name"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter phone number"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>

            {/* Row 3: DOB + DOJ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date_of_birth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="date_of_joining"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Joining
                </label>
                <input
                  type="date"
                  id="date_of_joining"
                  name="date_of_joining"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>

            {/* Row 4: Department + Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  placeholder="Enter department"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Enter designation"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>

            {/* Row 5: Status */}
            <div className="flex items-center">
              <input
                id="status"
                name="status"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                  focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                  dark:focus:ring-primary-600"
              />
              <label
                htmlFor="status"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Active
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddEmployee;
