export const addEnrollment = async ( studentId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/training/instructor/enrollments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({ "student": studentId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed adding enrollment.");
  }

  return data;
}