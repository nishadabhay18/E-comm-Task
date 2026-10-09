import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify'

function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                form
            )

            console.log(response)
            // alert("Registration successful")
            toast.success("Registration successful")
            navigate("/products")

        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        }
    }

    return (
        // <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="min-h-screen flex items-center justify-center bg-black/80">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-3"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-3"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-3"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                    Register
                </button>

                <p className="text-center mt-4">
                    Already have an account?
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-blue-600 ml-1">
                        Login
                    </button>
                </p>

            </form>

        </div>
        // </div>
    )
}

export default Register
