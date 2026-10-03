import mongoose from 'mongoose'
import config from './env.js'

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log('Server is connected with DB')
    }
    catch (err) {
        console.log('Error while connecting with DB', err)
    }
}

export default connectToDB