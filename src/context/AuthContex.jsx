import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setauthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Work");
    try {
      let response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      let data = await response.json();
      console.log({ data: data });
      console.log({ response: response });

      if (response.status === 200) {
        setauthToken(data);
        localStorage.setItem("authToken", JSON.stringify(data.tokens.access));
        localStorage.setItem("data", JSON.stringify(data));
        setUser(data);
        toast.success("Login Sucessfully");
        navigate("/");
        setLoading(false);
      } else {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      navigate("/notfound");
      toast.info("Server Is Unrechable");
      setLoading(false);
    }
  };
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting Employee Data...");

    try {
      let response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
          confirm_password: e.target.confirm_password.value,

          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          employee_id: e.target.employee_id.value,
          department: e.target.department.value,
          designation: e.target.designation.value,
          date_of_birth: e.target.date_of_birth.value,
          gender: e.target.gender.value,
          marital_status: e.target.marital_status.value,
          phone_number: e.target.phone_number.value,
          emergency_contact: e.target.emergency_contact.value,
          emergency_contact_name: e.target.emergency_contact_name.value,
          address: e.target.address.value,
          city: e.target.city.value,
          state: e.target.state.value,
          country: e.target.country.value,
          zip_code: e.target.zip_code.value,
          date_joined: e.target.date_of_joining.value,
          employment_type: e.target.employment_type.value,
          work_email: e.target.work_email.value,
          work_phone: e.target.work_phone.value,
          work_location: e.target.work_location.value,
          manager: e.target.manager.value,
          is_active: e.target.status.checked,
        }),
      });

      let data = await response.json();
      console.log({ data, response });

      if (response.status === 201) {
        alert("Employee Registered Successfully!");
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      alert("Server Unreachable");
    }
  };

  const logoutUser = () => {
    setLoading(true);
    setauthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("data");
    localStorage.removeItem("access");
    toast.warning("Logout Succesfully");
    navigate("/login");
    setLoading(false);
  };
  let contextData = {
    authToken: authToken,
    user: user,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading && <Loading />}
      {children}
    </AuthContext.Provider>
  );
};
