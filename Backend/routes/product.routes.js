import express from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { createProductController, deleteProductController, getSingleProductCOntroller, listProductsController, updateProductController } from '../controllers/product.controller.js'
import { productValidation } from '../validators/product.validator.js'

const router = express.Router()

router.post('/', authenticateUser, productValidation, createProductController)

router.get('/', listProductsController)

router.get('/:id', getSingleProductCOntroller)

router.put('/:id', authenticateUser, updateProductController)

router.delete('/:id', authenticateUser, deleteProductController)

export default router