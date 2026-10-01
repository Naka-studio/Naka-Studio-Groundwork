import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useContact() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/contact")
      .then((res) => setContact(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { contact, loading, error };
}
