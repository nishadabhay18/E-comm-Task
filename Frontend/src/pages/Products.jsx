import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import ProductForm from "../components/ProductForm"

function Products() {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/products`
            )

            setProducts(response.data.products)

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch products"
            )
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const deleteProduct = async (id) => {

        try {

            const token = localStorage.getItem("accessToken")

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            toast.success("Product deleted successfully")

            fetchProducts()

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            )
        }
    }

    const editProduct = (product) => {
        console.log("Edit product:", product)
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-6">Products</h1>

                <ProductForm fetchProducts={fetchProducts}/>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            deleteProduct={deleteProduct}
                            editProduct={editProduct}
                        />
                    ))}

                </div>

            </div>

        </div>
    )
}

export default Products