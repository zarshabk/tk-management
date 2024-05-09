import mongoose from "mongoose";

export const Connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if (conn) {
      console.log("connected with database");
    }
    {
      console.log("Connection Failed!");
    }
  } catch (error) {
    console.log("error while connecting with db", error);
  }
};
