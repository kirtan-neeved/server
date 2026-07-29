import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "";
    const response = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected successfully: `, response.connection.host);
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log("Something went wrong while connecting to DB: ", error);
  }
};
