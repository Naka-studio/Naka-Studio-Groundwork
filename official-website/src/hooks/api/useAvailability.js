import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useAvailability() {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/availability")
      .then((res) => setAvailability(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // status global (yg service_id-nya null)
  const globalStatus =
    availability.find((a) => a.service_id === null) || null;

  // status per layanan, kuncinya service_id ("01", "02", dst)
  const byService = Object.fromEntries(
    availability.filter((a) => a.service_id).map((a) => [a.service_id, a]),
  );

  return { availability, globalStatus, byService, loading, error };
}