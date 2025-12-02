import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Wczytanie pliku JSON BEZ BŁĘDÓW:
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());


// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const newTask = {
      title: req.body.title,
      completed: false,
      createdAt: Date.now()
    };

    const docRef = await db.collection("tasks").add(newTask);

    res.json({ id: docRef.id, ...newTask });
  } catch (err) {
    console.error("POST /tasks error:", err);
    res.status(500).json({ error: "Could not create task" });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("tasks").doc(id).update(req.body);

    res.json({ id, ...req.body });
  } catch (err) {
    console.error("PUT /tasks error:", err);
    res.status(500).json({ error: "Could not update task" });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("tasks").doc(id).delete();

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /tasks error:", err);
    res.status(500).json({ error: "Could not delete task" });
  }
});

// START
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
