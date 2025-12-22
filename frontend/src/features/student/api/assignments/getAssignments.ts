export const getAssignments = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/training/student/assignments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch assignments.")
  }

  return data;
}