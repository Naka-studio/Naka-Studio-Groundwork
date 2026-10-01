import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function usePricing() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/pricing")
      .then((res) => setPricing(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { pricing, loading, error };
}
