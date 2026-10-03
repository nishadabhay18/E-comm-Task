import jwt from "jsonwebtoken"
import config from "../config/env.js"

export const authenticateUser = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Access token required"
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(
            token,
            config.ACCESS_TOKEN_SECRET
        )

        req.user = decoded

        next()

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}