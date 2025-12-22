import { Box, Checkbox } from "@mui/material";
import { useAssignments } from "./hooks/assignments/useAssignments";
import { useUpdateAssignment } from "./hooks/assignments/useUpdateAssignment";
import { colors } from "../../shared/constants";

interface Drill {
  id: number;
  title: string;
  video_url: string;
}

interface Assignment {
  id: number;
  enrollment: number;
  is_completed: boolean;
  drill: number;
  drill_detail?: Drill;
}

export const AssignedDrillsPage = () => {
  const { data: assignments = [] } = useAssignments();
  const updateAssignment = useUpdateAssignment();

  if (assignments.length === 0) {
    return (
      <Box sx={{ px: 4, color: colors.inPageText, mt: 8, ml: 6 }}>
        No drills assigned yet.
      </Box>
    );
  }

  return (
    <Box>
      {assignments
        .filter((a: Assignment) => a.drill_detail)
        .map((a: Assignment) => (
          <Box
            key={a.id}
            sx={{
              mb: 5,
              ml: 15,
              p: 4,
              bgcolor: colors.pageBg,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <Checkbox
                sx={{
                  color: colors.inPageText,
                }}
                checked={a.is_completed}
                onChange={() =>
                  updateAssignment.mutate({
                    assignmentId: a.id,
                    isCompleted: !a.is_completed,
                  })
                }
              />

              <Box
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: colors.inPageText,
                }}
              >
                {a.drill_detail!.title}
              </Box>
            </Box>

            <Box sx={{ maxWidth: 720, ml: "55px" }}>
              <iframe
                src={a.drill_detail!.video_url}
                title={a.drill_detail!.title}
                width="100%"
                height="405"
                style={{
                  border: 0,
                  borderRadius: "8px",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
};