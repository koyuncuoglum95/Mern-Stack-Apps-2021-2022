import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';


const app = express();

app.use(cors());


dotenv.config();

const CONNECTION_URL = 'mongodb+srv://memo95:9a95152c@cluster0.aqhyt5n.mongodb.net/MemoTube?retryWrites=true&w=majority';

const connect = () => {
  mongoose
    .connect(CONNECTION_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log("Connected to Server");
});

app.get('/', (req, res) => {
  res.send('Welcome to MemoTube');
})
