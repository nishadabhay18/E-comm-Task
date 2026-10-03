import { useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("accessToken")
        navigate("/login")
    }

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold">My Store</h2>

            <div className="flex gap-3">
                <button
                    onClick={() => navigate("/products")}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                    Products
                </button>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar