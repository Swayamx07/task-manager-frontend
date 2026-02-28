import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register(name, email, password);
            } else {
                await login(email, password);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-80 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">
                    {isRegister ? "Register" : "Login"}
                </h2>

                {isRegister && (
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-xl">
                    {isRegister ? "Register" : "Login"}
                </button>

                <p
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-sm text-center cursor-pointer text-blue-500"
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                </p>
            </form>
        </div>
    );
}

export default Login;