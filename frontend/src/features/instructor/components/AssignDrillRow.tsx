import { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "../../../shared/constants";
import { useAddAssignment } from "../hooks/assignments/useAddAssignment";
import { useDeleteAssignment } from "../hooks/assignments/useDeleteAssignment";


interface Drill {
  id: number;
  title: string;
}

interface Assignment {
  id: number;
  enrollment: number;
  drill: number,
  drill_detail?: Drill,
  is_completed: boolean;
}

interface DrillOption {
  id: number;
  title: string;
}

interface AssignedDrillOption extends DrillOption {
  assignmentId: number;
}


export const AssignDrillRow = ({
  enrollmentId,
  studentName,
  assignments,
  drills,
}: {
  enrollmentId: number;
  studentName: string;
  assignments: Assignment[];
  drills: Drill[];
}) => {
  const assigned = useMemo(() =>
    assignments.filter(
      (a) => a.enrollment === enrollmentId && !a.is_completed
    ), [assignments, enrollmentId]
  );

  const initialSelectedDrills = useMemo<AssignedDrillOption[]>(() =>
    assigned
      .filter((a) => a.drill_detail)
      .map((a) => ({
        id: a.drill_detail!.id,
        title: a.drill_detail!.title,
        assignmentId: a.id
      })),
    [assigned]
  );

  
  const [selected, setSelected] = useState<AssignedDrillOption[]>(initialSelectedDrills);
  const [lastSaved, setLastSaved] = useState<AssignedDrillOption[]>(initialSelectedDrills);

  useEffect(() => {
    setSelected(initialSelectedDrills);
    setLastSaved(initialSelectedDrills);
  }, [initialSelectedDrills]);


  const addAssignment = useAddAssignment();
  const deleteAssignment = useDeleteAssignment();


  const handleSave = () => {
    const prevIds = lastSaved.map((d) => d.id);
    const currIds = selected.map((d) => d.id);

    // add
    currIds
      .filter((id) => !prevIds.includes(id))
      .forEach((drillId) => {
        addAssignment.mutate({ enrollmentId, drillId });
      });

    // delete
    prevIds
      .filter((id) => !currIds.includes(id))
      .forEach((drillId) => {
        const removed = lastSaved.find((d) => d.id === drillId);
        if (removed) {
          deleteAssignment.mutate(removed.assignmentId);
        }
      });

    setLastSaved(selected);
  };


  return (
    <Box sx={{ width: "900px", ml: "150px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 200px",
          gap: 3,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ color: colors.inPageText, fontSize: 16 }}>
          {studentName}
        </Typography>

        <Autocomplete<DrillOption, true>
          multiple
          disableCloseOnSelect
          options={drills.map((d) => ({
            id: d.id,
            title: d.title,
          }))}
          value={selected}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          getOptionLabel={(o) => o.title}
          onChange={(_, v) =>
            setSelected(v as AssignedDrillOption[])
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              flexWrap: "wrap",
              alignItems: "center",
            },
            "& .MuiAutocomplete-input": {
              minWidth: "60px",
              opacity: 1,
              color: colors.inPageText,
            },
            "& .MuiAutocomplete-tag": {
              maxWidth: "100%",
            },
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });

              return (
                <Chip
                  key={key}
                  {...tagProps}
                  label={option.title}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: `1px solid ${colors.accent}`,
                    fontSize: "14px",
                    "& .MuiChip-label": {
                      color: colors.inPageText + " !important",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField {...params} placeholder="Select drills" />
          )}
        />

        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: 15,
            fontWeight: 300,
            textTransform: "none",
            color: colors.accent,
            borderColor: colors.accent,
            width: "80px",
            "&:hover": {
              borderColor: colors.hover,
              color: colors.line,
              background: colors.hover,
            },
          }}
          onClick={handleSave}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};