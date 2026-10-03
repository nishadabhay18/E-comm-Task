import { body, validationResult } from 'express-validator'

export const registerValidation = [
    body('name')
        .exists().withMessage('Name is required').bail()
        .isString().withMessage('Name must be in string format').bail()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name length must be in between 2 to 50 characters"),

    body('email')
        .exists().withMessage('Email is required').bail()
        .isString().withMessage('Email must be in string format').bail()
        .trim()
        .isEmail().withMessage('Enter valid email address'),

    body('password')
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be in string format').bail()
        .trim()
        .isLength({ min: 4 }).withMessage('Pasword should be atleast of 4 characters'),

    (req, res, next) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Inavlid request',
                errors: errors.array()
            })
        }
        next()
    }
]


export const loginValidation = [
    body('email')
        .exists().withMessage('Email is required').bail()
        .isString().withMessage('Email must be in string format').bail()
        .trim()
        .isEmail().withMessage('Enter valid email address'),

    body('password')
        .exists().withMessage('Password is required').bail()
        .isString().withMessage('Password must be in string format').bail()
        .trim()
        .isLength({ min: 4 }).withMessage('Pasword should be atleast of 4 characters'),

    (req, res, next) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Inavlid request',
                errors: errors.array()
            })
        }
        next()
    }
]