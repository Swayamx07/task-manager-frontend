import { getToken, setToken, clearToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
    let token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    let res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        // For cookies to work across domains (Vercel), we need this:
        credentials: "include", 
    });

    // Check if Token Expired (401)
    if (res.status === 401 && !options._retry) {
        options._retry = true; // Prevent infinite loops

        // Try to refresh the token
        const refreshRes = await fetch(`${API_BASE_URL}/refresh`, {
            method: "POST",
            credentials: "include", // Send the HttpOnly cookie
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            setToken(data.accessToken); // Save new short-lived token
            
            // Re-try the original request with the NEW token
            return apiFetch(endpoint, options);
        } else {
            // Refresh failed (session totally expired)
            clearToken();
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
};

// You can now rewrite getActivities to use the main apiFetch logic
export const getActivities = async () => {
    return apiFetch("/activities");
};