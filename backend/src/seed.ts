import { db } from "./services/firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const seedTasks = async () => {
    const snapshot = await getDocs(collection(db, "tasks"));

    if (!snapshot.empty) return; // jeśli coś jest, nie seedujemy

    console.log("Seeding example tasks...");

    const exampleTasks = [
        {
            projectId: "p1",
            title: "Pierwsze zadanie",
            description: "To jest przykład zadania",
            status: "To Do"
        },
        {
            projectId: "p1",
            title: "Drugie zadanie",
            description: "Kolejne zadanie testowe",
            status: "In Progress"
        },
        {
            projectId: "p2",
            title: "Zadanie z projektu 2",
            description: "Jeszcze jedno zadanie",
            status: "Done"
        }
    ];

    for (const task of exampleTasks) {
        await addDoc(collection(db, "tasks"), task);
    }

    console.log("Seed completed!");
};
