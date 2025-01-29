import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Log MongoDB URI for debugging
console.log("MongoDB URI:", URI);

// Connect to MongoDB using async/await
const connectToMongo = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,   // Optional now but can be removed to prevent warnings
      useUnifiedTopology: true, // Optional now but can be removed to prevent warnings
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

connectToMongo();  // Call the function to connect

// Define routes
app.use("/book", bookRoute);
app.use("/user",userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
