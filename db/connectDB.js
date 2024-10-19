import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  // If there's an existing connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection exists, create one
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/github", {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Recommended for modern MongoDB setups
      })
      .then((mongoose) => {
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;
