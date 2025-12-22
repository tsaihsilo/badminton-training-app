export const addAssignment = async ({ enrollmentId, drillId }: {enrollmentId: number, drillId: number }) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/training/instructor/assignments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({ "enrollment": enrollmentId, "drill": drillId })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to add assignment.")
  }

  return data;
}