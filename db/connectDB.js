import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://rajnaman488:${process.env.DB_PASSWORD}@nextapp-cluster.iikn9.mongodb.net/?retryWrites=true&w=majority&appName=NextApp-Cluster`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

export default connectDb;
