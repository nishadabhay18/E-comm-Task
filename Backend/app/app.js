
import express from 'express'
import morgan from 'morgan'
import authRoutes from '../routes/auth.routes.js'
import productRoutes from '../routes/product.routes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Server is Live')
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

export default app