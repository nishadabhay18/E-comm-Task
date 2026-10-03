import app from './app/app.js'
import connectToDB from './config/db.js'
import config from './config/env.js'

const PORT = config.PORT || 4000

connectToDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})