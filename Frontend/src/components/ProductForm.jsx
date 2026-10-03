import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

function ProductForm({ fetchProducts }) {

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem("accessToken")

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/products`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response)

            setForm({
                name: "",
                description: "",
                price: "",
                stock: "",
                image: ""
            })

            toast.success("Product added successfully")

            fetchProducts()

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add product"
            )
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-1">Add Product</h2>

            <p className="text-gray-500 mb-6">Add a new product to your store</p>

            <form
                onSubmit={handleSubmit}
                className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>

                    <input
                        name="name"
                        placeholder="Enter product name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>

                        <input
                            name="price"
                            type="number"
                            placeholder="₹ 0"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>

                        <input
                            name="stock"
                            type="number"
                            placeholder="0"
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>

                    <input
                        name="image"
                        placeholder="https://example.com/image.jpg"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Add Product
                </button>

            </form>

        </div>
    )
}

export default ProductForm
