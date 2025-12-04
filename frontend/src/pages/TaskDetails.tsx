// src/pages/TaskDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Task } from "../types/Task";
import { Comment } from "../types/Comment";

export default function TaskDetails() {
  const { id, taskId } = useParams<{ id?: string; taskId?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!id || !taskId) return;

    async function loadTask() {
      const ref = doc(db, `projects/${id}/tasks/${taskId}`);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as Partial<Task>;
        setTask({
          id: snap.id,
          title: data.title || "",
          description: data.description || "",
          status: data.status || "",
          dueDate: data.dueDate,
          assignedTo: data.assignedTo,
          createdAt: data.createdAt,
          priority: data.priority,
          projectId: data.projectId,
        } as Task);
      } else {
        setTask(null);
      }
    }

    loadTask();

    const unsub = onSnapshot(
      collection(db, `projects/${id}/tasks/${taskId}/comments`),
      snap => {
        setComments(
          snap.docs.map(d => {
            const cd = d.data() as Partial<Comment>;
            return {
              id: d.id,
              author: cd.author || "Anon",
              message: cd.message || "",
              createdAt: cd.createdAt ? String(cd.createdAt) : undefined,
            } as Comment;
          })
        );
      }
    );

    return () => unsub();
  }, [id, taskId]);

  async function addComment() {
    if (!id || !taskId) return;
    if (!msg.trim()) return;

    await addDoc(collection(db, `projects/${id}/tasks/${taskId}/comments`), {
      author: "User",
      message: msg,
      createdAt: Date.now(),
    });

    setMsg("");
  }

  if (!task) return <div>Ładowanie…</div>;

  return (
    <div className="container py-4">
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Termin:</strong> {task.dueDate}</p>

      <h3>Komentarze</h3>
      <ul className="list-group mb-3">
        {comments.map(c => (
          <li key={c.id} className="list-group-item">
            <strong>{c.author}: </strong> {c.message}
          </li>
        ))}
      </ul>

      <div className="input-group">
        <input
          className="form-control"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Dodaj komentarz…"
        />
        <button className="btn btn-primary" onClick={addComment}>Wyślij</button>
      </div>
    </div>
  );
}
