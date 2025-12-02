import { createTask, getAllTasks, updateTaskStatus } from "../services/database.js";
export const getTasks = async (_, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};
export const addTask = async (req, res) => {
    const task = req.body;
    const ref = await createTask(task);
    res.json({ message: "Task created", id: ref.id });
};
export const changeTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await updateTaskStatus(id, status);
    res.json({ message: "Status updated" });
};
