import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/blog")
      .then((res) => setPosts(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
