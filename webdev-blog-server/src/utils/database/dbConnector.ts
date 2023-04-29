import mongoose from 'mongoose'
import config from "../../config/config"


// Update below to match your own MongoDB connection string.
const MONGO_URL = config.DB_URL;

mongoose.connection.once("open", () => {
  console.log("db connection ready!");
});

mongoose.connection.on("error", (err:any) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};


export default mongoConnect