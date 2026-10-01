import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => {
        setTestimonials(res.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading, error };
}
