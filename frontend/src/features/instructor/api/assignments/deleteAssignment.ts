export const deleteAssignment = async (assignmentId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000/api/training/instructor/assignments/${assignmentId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to delete assignment.");
  }
}