
function ProductCard({ product, deleteProduct, editProduct }) {

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />

            <h2 className="text-xl font-bold mt-4">{product.name}</h2>

            <p className="text-gray-600 mt-2">{product.description}</p>

            <p className="text-lg font-semibold mt-3">₹{product.price}</p>

            <p className="text-gray-500">Stock: {product.stock}</p>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => editProduct(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Edit
                </button>

                <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProductCard