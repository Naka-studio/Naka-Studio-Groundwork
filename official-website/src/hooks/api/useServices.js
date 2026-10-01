import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}
