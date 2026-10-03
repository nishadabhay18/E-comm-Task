import jwt from 'jsonwebtoken'
import config from '../config/env.js'

export const createAccessToken = async ({ userId }) => {
    const accessToken = await jwt.sign({
        userId
    }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

    return accessToken
}

export const readAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
}

export const createRefreshToken = async ({ userId }) => {
    const refreshToken = await jwt.sign({
        userId
    }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

    return refreshToken
}

export const readRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
}