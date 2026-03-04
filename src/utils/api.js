import { getToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getActivities = async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/activities`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch activities");
    }

    return res.json();
};


export const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
        body: options.body,
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("API ERROR:", data);
        throw new Error(data.message || "Request failed");
    }

    return data;
};