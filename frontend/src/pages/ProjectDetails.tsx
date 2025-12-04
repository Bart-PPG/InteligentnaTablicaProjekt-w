// src/pages/ProjectDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Project } from "../types/Project";
import { Task } from "../types/Task";

export default function ProjectDetails() {
  // Typujemy useParams żeby TS wiedział że id to string | undefined
  const { id } = useParams<{ id?: string }>();
  console.log("PARAMS:", id);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      // brak id w URL — nic nie robimy
      setLoading(false);
      return;
    }

    const load = async () => {
        console.log("Pobieram projekt:", id);
      try {
        // pobieramy dokument projektu
        const ref = doc(db, "projects", id); // teraz id jest string (bo sprawdziliśmy)
        const snap = await getDoc(ref);
        console.log(" SNAPSHOT:", snap.exists(), snap.data());

        if (snap.exists()) {
          const data = snap.data() as Partial<Project>;
          setProject({
            id: snap.id,
            name: data.name || "",
            description: data.description || "",
            ownerId: data.ownerId || "",
            status: data.status || "",
            createdAt: (data.createdAt as any) || undefined,
          });
        } else {
          setProject(null);
        }

        // pobieramy zadania z subcollection 'tasks'
        const tasksCol = await getDocs(collection(db, "projects", id, "tasks"));
        const tasksArr: Task[] = tasksCol.docs.map(d => {
          const td = d.data() as Partial<Task>;
          return {
            id: d.id,
            title: td.title || "",
            description: td.description || "",
            status: td.status || "",
            dueDate: td.dueDate,
            assignedTo: td.assignedTo,
            createdAt: td.createdAt,
            priority: td.priority,
            projectId: td.projectId || id,
            commentsCount: td.commentsCount,
          } as Task;
        });

        setTasks(tasksArr);
      } catch (err) {
        console.error("Load project error", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div>Ładowanie projektu…</div>;
  if (!id) return <div>Brak ID projektu w URL</div>;
  if (project === null) return <div>Projekt nie znaleziony</div>;

  return (
    <div className="container py-4">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      <h3 className="mt-4">Zadania</h3>
      <ul className="list-group">
        {tasks.map(t => (
          <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <Link to={`/projects/${id}/tasks/${t.id}`} className="fw-bold">{t.title}</Link>
              <div className="small text-muted">{t.description}</div>
            </div>
            <span className="badge bg-primary">{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
