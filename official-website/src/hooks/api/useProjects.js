import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
