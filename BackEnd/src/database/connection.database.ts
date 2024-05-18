import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const getConnection = async () => {
  mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/WFHTrackingSystem")
  .then(()=>{
      console.log("Mongo DB connection created!");
  })
  .catch((err)=>{
      console.log("Error connecting to Mongo DB: ", err);
  })
}

export default getConnection;

