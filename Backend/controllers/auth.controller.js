import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken, readAccessToken, readRefreshToken } from "../utils/auth.utils.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const isEmailExists = await userModel.findOne({ email })

        if (isEmailExists) {
            return res.status(400).json({
                message: "User already exists with this email",
                errors: [
                    {
                        path: "email",
                        msg: "User exists with this email address"
                    }
                ]
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const user = await userModel.create({
            email, password: hashPassword, name
        })

        const accessToken = await createAccessToken({ userId: user._id })

        const refreshToken = await createRefreshToken({ userId: user._id })

        await userModel.findByIdAndUpdate(user._id, { refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })

        res.status(201).json({
            message: "User registered successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email and password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email and password"
            })
        }

        const accessToken = await createAccessToken({ userId: user._id })

        const refreshToken = await createRefreshToken({ userId: user._id })

        await userModel.findByIdAndUpdate(user._id, { refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })

        res.status(201).json({
            message: "User loggedIn successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}


export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh Token is expired"
            })
        }

        const decoded = readRefreshToken(refreshToken)

        const { userId } = decoded

        const user = await userModel.findById(userId)

        if (refreshToken !== user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })

            return res.status(401).json({
                message: "Refresh Token mismatch"
            })
        }

        const accessToken = createAccessToken({ userId: user._id })

        const newRefreshToken = createRefreshToken({ userId: user._id })

        await userModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Tokens refreshed successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name
                },
                accessToken
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}


export const getMeController = async (req, res) => {
    const { userId } = req.body

    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "User fetched successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                password: user.password
            }
        }
    })
}


export const logoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refersh Token is expired"
            })
        }

        await userModel.findOneAndUpdate({ refreshToken }, { refreshToken: null })

        res.clearCookie('refreshToken')

        res.status(200).json({
            message: "User logged out successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}