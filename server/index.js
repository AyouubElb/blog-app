import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

//config
const app = express();
dotenv.config();

// Middelware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes Middleware
app.use("/api/posts", postRoutes);
app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);

//Run the app
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is running on port : ${port}`));
