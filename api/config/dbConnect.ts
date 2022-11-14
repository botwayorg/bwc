import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("MNGODB_URL");
  } catch (err) {
    console.error(err);
  }
};
