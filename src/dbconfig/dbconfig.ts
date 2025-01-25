import mongoose from 'mongoose'

const DB_NAME = 'playproCN'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log('Connected to MongoDB Host : ', connectionInstance.connection.host)
    } catch (error) {
        console.log('Could not connect to the database !\n', error)
        process.exit(1)
    }
}

export default connectDB