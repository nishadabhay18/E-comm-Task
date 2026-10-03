import productModel from "../models/product.model.js";


export const createProductController = async (req, res) => {
    try {
        const { image, name, description, price, stock } = req.body

        const product = await productModel.create({ image, name, description, price, stock })

        res.status(201).json({
            message: "Product created successfully",
            product
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }
}


export const listProductsController = async (req, res) => {
    try {
        const products = await productModel.find()

        res.status(200).json({
            message: "All Products fetched successfully",
            products
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }
}


export const getSingleProductCOntroller = async (req, res) => {
    try {

        const { id } = req.params

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "All Products fetched successfully",
            product
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }
}


export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params

        const { image, name, description, stock, price } = req.body

        const product = await productModel.findByIdAndUpdate(
            id,
            { name, description, stock, price, image },
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }
}


export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params

        const product = await productModel.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err
        })
    }
}