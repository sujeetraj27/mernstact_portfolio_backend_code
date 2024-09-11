import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";
import experinceRouter from "./routes/experienceRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// console.log('Allowed Origins:', process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL);
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// const allowedOrigins = [
//   'https://portfolio-sujeet-kumar.netlify.app',
//   'https://my-portfilio-dashboard.netlify.app'
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log('Origin:', origin);  // Log the origin to debug
//       if (!origin) {
//         // Allow requests with no origin (same-origin, Postman, etc.)
//         callback(null, true);
//       } else if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.error('Blocked by CORS:', origin);
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );




app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/experince", experinceRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
