import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        length: [500, "Description length should be less than 500 characters"]
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model('products', productSchema)

export default productModel