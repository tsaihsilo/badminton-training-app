import { useEnrollments } from "./hooks/enrollments/useEnrollments";
import { useDeleteEnrollment } from "./hooks/enrollments/useDeleteEnrollment";

import { DropDownMenu } from "./components/DropDownMenu";

import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../shared/constants";


export interface Enrollment {
  id: number;
  instructor_username: string;
  student_username: string;
}


export const ManageStudentsPage = () => {
  const { data = [] } = useEnrollments();
  const deleteEnrollment = useDeleteEnrollment();

  return (
    <div style={{ padding: "60px 40px" }}>
      <div style={{ marginBottom: "120px" }}>
        <Typography 
          sx={{
            color: colors.inPageText,
            fontSize: 23,
            fontWeight: 550,
            ml: "120px",
          }}
        >
          Students: 
        </Typography>
        {data.map((enrollment: Enrollment) => (
          <div
            key={enrollment.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "23px",
              marginLeft: "200px",
              marginTop: "7px"
            }}
          >
            <Typography
              sx={{
                color: colors.inPageText,
                fontSize: 17,
                fontWeight: 400,
                mt: "30px"
              }}
            >
              {enrollment.student_username}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: 12,           
                fontWeight: 300,        
                textTransform: "none",   // Prevents BUTTON from uppercasing text
                color: colors.accent,
                borderColor: colors.accent,
                marginTop: "30px",
                padding: "2px 10px",
                minWidth: "auto",
                "&:hover": {
                  borderColor: colors.hover,
                  color: colors.line,
                  background: colors.hover,
                },
              }}
              onClick={() => deleteEnrollment.mutate(enrollment.id)}
            >
                remove
            </Button>
          </div>
        ))}
      </div>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          ml: "120px",
          mt: 3, 
          width: "fit-content" 
        }}
      >
        <Typography 
          sx={{
            color: colors.inPageText,
            fontSize: 23,
            fontWeight: 550,
          }}
        >
          Search student: 
        </Typography>
        <Box >
          <DropDownMenu />
        </Box>
      </Box>
    </div>
  )
}