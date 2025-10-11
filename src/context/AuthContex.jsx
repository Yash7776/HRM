import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Loading from "../components/Loading.jsx";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authToken, setauthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('data')) : null)
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);


    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Work");
        try {
            let response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            })

            let data = await response.json()
            console.log({ 'data': data })
            console.log({ 'response': response })

            if (response.status === 200) {
                setauthToken(data)
                localStorage.setItem('authToken', JSON.stringify(data.access))
                let access = data.access
                await userprofile(access)
                toast.success("Login Sucessfully")
                navigate("/")
                setLoading(false);
            }
            else {
                toast.error(data.error)
                setLoading(false);
            }
        }
        catch (error) {
            navigate("/notfound")
            toast.info("Server Is Unrechable")
            setLoading(false)
        }
    }
    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Work");
        try {
            let response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'email': e.target.email.value,
                    'password': e.target.password.value,
                    'confirm_password': e.target.password.value,
                    'role': e.target.role.value,
                })
            })

            let data = await response.json()
            console.log({ 'data': data })
            console.log({ 'response': response })

            if (response.status === 201) {
                toast.success("User Registerd Please Login Using Your Credentials")
                navigate("/login")
                setLoading(false);
            }
            else {
                toast.error(data.error)
                setLoading(false);
            }
        }catch (error) {
            navigate("/notfound")
            toast.info("Server Is Unrechable")
            setLoading(false)
        }
    }
    const userprofile = async (access) => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                },
            })
            let data = await response.json()
            console.log({ 'data': data })
            console.log({ 'response': response })
            localStorage.setItem('data', JSON.stringify(data))
            setUser(data)
            // console.log("DUB",data.user)
        }catch (error) {
            navigate("/notfound")
            toast.info("Server Is Unrechable")
            setLoading(false)
        }
    }
    // #################################################################################################

   
    
    const logoutUser = () => {
        setLoading(true)
        setauthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('data')
        localStorage.removeItem('access')
        toast.warning("Logout Succesfully")
        navigate('/login')
        setLoading(false)
    }
    let contextData = {
        authToken: authToken,
        user: user,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading && <Loading />}
            {children}
        </AuthContext.Provider>
    )
}