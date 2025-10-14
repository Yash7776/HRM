import { createContext, useState, useEffect,useContext } from "react";
import AuthContext from "../context/AuthContex";


const ServicesContext = createContext();
export default ServicesContext;

export const ServicesProvider = ({ children }) => {
    const { user } = useContext(AuthContext); // Assuming you store token in AuthContext
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    
    useEffect(() => {
        getDepartmenets();
        getDesignations()
    },[])

    // Get All Departments
    const getDepartmenets = async () => {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/departments/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.tokens.access}`,
                        'Content-Type': 'application/json',
                    },
                })
                let data = await response.json()
                setDepartments(data)
            }catch (error) {
                navigate("/notfound")
                toast.info("Server Is Unrechable")
                setLoading(false)
            }
    }
    // Get All Departments
    const getDesignations = async () => {
            if (!user.tokens.access) return; // Wait until token available
            try {
                let response = await fetch('http://127.0.0.1:8000/api/designations/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.tokens.access}`,
                        'Content-Type': 'application/json',
                    },
                })
                let data = await response.json()
                setDesignations(data)
            }catch (error) {
                navigate("/notfound")
                toast.info("Server Is Unrechable")
                setLoading(false)
            }
    }

  return (
    <ServicesContext.Provider value={{ departments, designations}}>
      {children}
    </ServicesContext.Provider>
  );
};
