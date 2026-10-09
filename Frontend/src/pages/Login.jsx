import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            )

            console.log(response.data)

            localStorage.setItem("accessToken", response.data.data.accessToken)

            // alert("Login successful")
            toast.success("Login successful")
            navigate("/products")
            

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/80">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded mb-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                    Login
                </button>

                <p className="text-center mt-4">
                    Don't have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-blue-600 ml-1">
                        Register
                    </button>
                </p>

            </form>

        </div>
    )
}

export default Login
