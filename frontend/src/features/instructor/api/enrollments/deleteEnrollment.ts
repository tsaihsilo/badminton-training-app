export const deleteEnrollment = async (enrollmentId: number) => {
  const token = localStorage.getItem("token");
  
  const res = await fetch(`http://localhost:8000/api/training/instructor/enrollments/${enrollmentId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed deleting enrollment.");
  }
}