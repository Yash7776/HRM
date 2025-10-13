import React, { useEffect, useState } from "react";
const EmployeeList = () => {
  useEffect(() => {
    getEmployees();  
  }, [])
  
  // Static employee data
  const [employees, setemployees] = useState([]);

  const getEmployees = async (access) => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/employees/", {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${access}`,
        //   "Content-Type": "application/json",
        // },
      });
      let data = await response.json();
      console.log({ data: data });
      console.log({ response: response });
      setemployees(data);
      // console.log("DUB",data.user)
    } catch (error) {
      navigate("/notfound");
      toast.info("Server Is Unrechable");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Employees</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.employee_id}
            className="border rounded-2xl shadow-md p-5 bg-white hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              {emp.first_name} {emp.last_name}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p>
                <span className="font-semibold">ID:</span> {emp.employee_id}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {emp.phone_number}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {emp.email}
              </p>
              <p>
                <span className="font-semibold">Department:</span>{" "}
                {emp.department}
              </p>
              <p>
                <span className="font-semibold">Date Of Birth:</span>{" "}
                {emp.date_of_birth}
              </p>
              <p>
                <span className="font-semibold">Designation:</span>{" "}
                {emp.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
