import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types/Project";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function load() {
      const col = await getDocs(collection(db, "projects"));
      setProjects(
        col.docs.map(d => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name,
            description: data.description,
            ownerId: data.ownerId,
            status: data.status,
            createdAt: data.createdAt
          };
        })
      );
    }
    load();
  }, []);

  return (
    <div className="container py-4">
      <h1>Projekty</h1>

      <ul className="list-group">
        {projects.map(p => (
          <li key={p.id} className="list-group-item">
            <Link to={`/projects/${p.id}`}>
              <strong>{p.name}</strong>
            </Link>
            <p className="m-0 text-muted">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
