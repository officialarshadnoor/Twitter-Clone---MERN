import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});

const app = express();
const port = process.env.PORT;

databaseConnection();

// middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin:
    "https://twitter-clone-git-main-arshadnoor585gmailcoms-projects.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "coming from backend",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
