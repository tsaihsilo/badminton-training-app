import { Box, Typography, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { colors } from "../../shared/constants";
import { useEnrollment } from "./hooks/enrollments/useEnrollment";

export const MyProfile = () => {
  const { data = [] } = useEnrollment();

  return (
    <Box sx={{ padding: "70px 50px" }}>
      <Typography
        sx={{
          color: colors.inPageText,
          fontSize: 26,
          fontWeight: 550,
          ml: "120px",
          mb: 4,
        }}
      >
        My Profile
      </Typography>

      <Box
        sx={{
          ml: "120px",
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          width: "420px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <PersonIcon sx={{ color: colors.accent }} />
          <Typography
            sx={{
              color: colors.inPageText,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Enrollment Info
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, opacity: 0.2 }} />

        <Typography
          sx={{
            fontSize: 15,
            color: colors.inPageText,
            opacity: 0.65,
            mb: 0.5,
          }}
        >
          Instructor
        </Typography>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: colors.accent,
          }}
        >
          {data?.instructor_username ?? "Not assigned"}
        </Typography>
      </Box>
    </Box>
  );
};