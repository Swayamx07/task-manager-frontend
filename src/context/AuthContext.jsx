import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { setToken as saveToken, getToken, clearToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }


        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);

    };
    const register = async (name, email, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        await login(email, password);
    };

    const logout = async () => {
        try {
            // Tell backend to clear the cookie
            await apiFetch("/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            clearToken();
            setToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);