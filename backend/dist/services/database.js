import { db } from "./firebase.js";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
export const getAllTasks = async () => {
    const snapshot = await getDocs(collection(db, "tasks"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const createTask = async (task) => {
    return await addDoc(collection(db, "tasks"), task);
};
export const updateTaskStatus = async (id, status) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, { status });
};
