import { createContext, useState, useEffect } from "react";
import { Backend_Url } from "../utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(`${Backend_Url}/api/auth/check-auth`);
            const data = await response.json();
            setAuth(data.isAuthenticated);
        }
        checkAuth();
    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
