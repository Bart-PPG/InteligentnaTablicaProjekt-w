import { Router } from "express";
import { getTasks, addTask, changeTaskStatus } from "../controllers/tasks";

const router = Router();

router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id", changeTaskStatus);

export default router;
