import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes";
import projectRouter from './routes/project.routes'
import bugRouter from './routes/bug.routes'
import commentRouter from './routes/comment.route'

const app = express();

app.use(cors())
app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/project", projectRouter)
app.use("/api/bugs", bugRouter);
app.use("/api/comments", commentRouter);


export default app;