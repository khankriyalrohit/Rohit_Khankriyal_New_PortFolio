const API_BASE = import.meta.env.VITE_API_URL;

export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}
