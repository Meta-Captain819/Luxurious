import mongoose from "mongoose";

const connectDb = async () => {
    console.log(process.env.MONGO_URI);
    
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDb;
