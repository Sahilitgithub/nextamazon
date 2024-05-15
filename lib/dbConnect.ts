import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!)
  } catch (error) {
    console.log("Mongodb Connection Failed.", error)
  }
}

export default dbConnect
