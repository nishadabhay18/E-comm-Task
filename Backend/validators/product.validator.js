import { body, validationResult } from 'express-validator'


export const productValidation = [
    body('name')
        .exists().withMessage("Product name is required").bail()
        .isString().withMessage("Product name must be in string").bail()
        .trim()
        .notEmpty().withMessage("Product name cannot be empty"),

    body('description')
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be in string").bail()
        .trim()
        .notEmpty().withMessage("Product description cannot be empty").bail()
        .isLength({ max: 500 }).withMessage("Description should be less than 500 characters"),

    body("price")
        .exists().withMessage("Price is required").bail()
        .isNumeric().withMessage("Price must be in Integer").bail()
        .custom(value => value > 0).withMessage("Price must be greater than 0"),

    body('stock')
        .exists().withMessage("Stock is required").bail()
        .isNumeric().withMessage("Stock must be in Integer").bail()
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

    body('image')
        .exists().withMessage("Image is required").bail()
        .isString().withMessage("Image url must be in string").bail()
        .trim()
        .notEmpty().withMessage("Image cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request"
            })
        }
        next()
    }
]
