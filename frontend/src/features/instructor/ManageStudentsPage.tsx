import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../shared/constants";

import { useEnrollments } from "./hooks/useEnrollments";

import { useDeleteEnrollment } from "./hooks/useDeleteEnrollment";
import { DropDownMenu } from "./components/DropDownMenu";

interface Enrollment {
  "id": number, 
  "instructor_username": string, 
  "student_username": string,
}

export const ManageStudentsPage = () => {
  const { data, isLoading, error} = useEnrollments();
  const deleteEnrollment = useDeleteEnrollment();
  
  if (isLoading ) return <div>Loading...</div>;
  if (error) return <div>Error loading enrollments.</div>;

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