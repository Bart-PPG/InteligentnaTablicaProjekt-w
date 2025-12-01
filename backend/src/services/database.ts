import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { Task } from "../models/Task";

export const getAllTasks = async () => {
    const snapshot = await getDocs(collection(db, "tasks"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const createTask = async (task: Task) => {
    return await addDoc(collection(db, "tasks"), task);
};

export const updateTaskStatus = async (id: string, status: string) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, { status });
};
