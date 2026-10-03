import express from 'express'
import { loginValidation, registerValidation } from '../validators/auth.validators.js'
import { getMeController, loginController, logoutController, refresh, registerController } from '../controllers/auth.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerValidation, registerController)

router.post('/login', loginValidation, loginController)

router.post('/refresh', refresh)

router.get('/get-me', authenticateUser, getMeController)

router.post('/logout', authenticateUser, logoutController)

export default router