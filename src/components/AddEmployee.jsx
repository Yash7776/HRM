import React, { useState,useContext } from "react";
import AuthContext from "../context/AuthContex";

const AddEmployee = () => {
  const [loading, setLoading] = useState(false);
  let {registerUser}=useContext(AuthContext)

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white text-center">
            Add New Employee
          </h1>

          <form className="space-y-6" onSubmit={registerUser}>
            {/* Row 1: First Name + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input type="text" id="first_name" name="first_name" placeholder="Enter first name" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input type="text" id="last_name" name="last_name" placeholder="Enter last name" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>

            {/* Row 2: Username + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input type="text" id="username" name="username" placeholder="Enter username" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input type="email" id="email" name="email" placeholder="name@company.com" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>

            {/* Row 3: Password + Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input type="password" id="password" name="password" placeholder="Enter password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>

              <div>
                <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input type="password" id="password2" name="password2" placeholder="Re-enter password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>

            {/* Row 4: Employee ID + Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employee_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee ID
                </label>
                <input type="text" id="employee_id" name="employee_id" placeholder="Enter Employee ID" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>

              <div>
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Department
                </label>
                <input type="text" id="department" name="department" placeholder="Enter department" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>

            {/* Row 5: Designation + Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Designation
                </label>
                <input type="text" id="designation" name="designation" placeholder="Enter designation" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </label>
                <input type="date" id="date_of_birth" name="date_of_birth" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>

            {/* Row 6: Gender + Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select id="gender" name="gender" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>

              <select id="marital_status" name="marital_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Select Marital Status</option>
                <option value="S">Single</option>
                <option value="M">Married</option>
                <option value="D">Divorced</option>
                <option value="W">Widowed</option>
              </select>
            </div>

            {/* Row 7: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="phone_number" name="phone_number" placeholder="Phone Number" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="text" id="emergency_contact" name="emergency_contact" placeholder="Emergency Contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 8: Emergency Contact Name */}
            <div>
              <input type="text" id="emergency_contact_name" name="emergency_contact_name" placeholder="Emergency Contact Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 9: Address */}
            <div>
              <textarea id="address" name="address" placeholder="Address" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>

            {/* Row 10: City + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="city" name="city" placeholder="City" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="text" id="state" name="state" placeholder="State" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 11: Country + ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="country" name="country" placeholder="Country" defaultValue="USA" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="text" id="zip_code" name="zip_code" placeholder="ZIP Code" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 12: Date Joined + Employment Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" id="date_of_joining" name="date_of_joining" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <select id="employment_type" name="employment_type" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Select Employment Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>

            {/* Row 13: Work Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" id="work_email" name="work_email" placeholder="Work Email" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="text" id="work_phone" name="work_phone" placeholder="Work Phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <input type="text" id="work_location" name="work_location" placeholder="Work Location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 14: Manager */}
            <div>
              <input type="text" id="manager" name="manager" placeholder="Manager ID (optional)" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            {/* Row 15: Status */}
            <div className="flex items-center">
              <input id="status" name="status" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600" defaultChecked />
              <label htmlFor="status" className="ml-2 text-sm text-gray-900 dark:text-white">
                Active
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {loading ? "Registering..." : "Register Employee"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddEmployee;
