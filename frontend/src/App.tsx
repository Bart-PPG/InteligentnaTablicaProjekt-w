import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const load = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Task Manager</h1>

      <ul className="list-group">
        {tasks.map(t => (
          <li key={t.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{t.title}</strong>
              <p className="m-0 text-muted">{t.description}</p>
            </div>
            <span className="badge bg-primary">{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
