export const addEnrollment = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/training/instructor/enrollments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify({ "student": id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Adding enrollment failed.");
  }

  return data;
}