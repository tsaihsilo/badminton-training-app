export const updateAssignment = async ({
  assignmentId, 
  isCompleted
}: {
  assignmentId: number, 
  isCompleted: boolean,
}
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000/api/training/student/assignments/${assignmentId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({ is_completed: isCompleted })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to update assignment.")
  }

  return data;
}