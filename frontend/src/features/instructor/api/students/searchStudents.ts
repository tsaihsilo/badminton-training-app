export const searchStudents = async (query: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000/api/training/instructor/students/search/${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed searching students.");
  }

  return data;
}