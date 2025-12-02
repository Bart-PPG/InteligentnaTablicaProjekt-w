import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);
app.listen(3001, () => {
    console.log("Backend running on http://localhost:3001");
});
app.get("/", (_, res) => {
    res.send("Backend działa");
});
