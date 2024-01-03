import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("URL nahi hai mongo db ka.");
    return;
  }

  if (isConnected) {
    console.log("Kitni baar connect karo ge? Already connected hai.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Ho gaya DB Connect!");
  } catch (e) {
    console.log("Error ho gaya ye wala : ", e);
  }
};

// p2e0Bb0642jw1yhN
