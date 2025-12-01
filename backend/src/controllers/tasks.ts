import { Request, Response } from "express";
import { createTask, getAllTasks, updateTaskStatus } from "../database";

export const getTasks = async (_: Request, res: Response) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
    const task = req.body;
    const ref = await createTask(task);
    res.json({ message: "Task created", id: ref.id });
};

export const changeTaskStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    await updateTaskStatus(id, status);
    res.json({ message: "Status updated" });
};
