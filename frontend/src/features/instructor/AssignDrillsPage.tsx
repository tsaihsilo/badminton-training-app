import { Box } from "@mui/material";
import { AssignDrillRow } from "./components/AssignDrillRow";
import { useDrills } from "./hooks/drills/useDrills";
import { useEnrollments } from "./hooks/enrollments/useEnrollments";
import { Enrollment } from "./ManageStudentsPage";
import { useAssignments } from "./hooks/assignments/useAssignments";

export const AssignDrillsPage = () => {
  const { data: enrollments = [] } = useEnrollments();
  const { data: assignments = [] } = useAssignments();
  const { data: drills = [] } = useDrills();

  return (
    <Box sx={{ padding: "60px 0"}}>
      {enrollments.map((enroll: Enrollment) => (
        <AssignDrillRow 
          key={enroll.id}
          enrollmentId={enroll.id}
          studentName={enroll.student_username}
          assignments={assignments}
          drills={drills}
        />
      ))}
    </Box>
  )
}