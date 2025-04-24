import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialDB";


mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => console.error("Connection Error:", err));
db.once("open", () => console.log("Connection Success!"));

export default db;
