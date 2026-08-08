import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes";
import projectRouter from './routes/project.routes'
import bugRouter from './routes/bug.routes'
import commentRouter from './routes/comment.route'
import dashboardRouter from "./routes/dashboard.route"
import activityRouter from "./routes/activity.route";
import reportRouter from "./routes/report.routes"
import userRouter from './routes/users.route'
import attachmentRoutes from './routes/attachment.route'
import dotenv from 'dotenv'

const app = express();

dotenv.config()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL || "",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/projects", projectRouter)
app.use("/api/bugs", bugRouter);
app.use("/api/comments", commentRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/users", userRouter)
// app.use("/api/notifications", notificationRouter)
app.use("/api/acitvity", activityRouter)
app.use("/api/reports", reportRouter);

app.use("/api/attachments", attachmentRoutes);

export default app;