import { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useSearchStudents } from "../hooks/useSearchStudents";
import { useAddEnrollment } from "../hooks/useAddEnrollment";
import { colors } from "../../../shared/constants";

interface Student {
  id: number;
  username: string;
}

export const DropDownMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: searchResult = [], isLoading } = useSearchStudents(searchText);
  const addEnrollment = useAddEnrollment();

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: "24px" }}>
      <Autocomplete<Student>
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            color: colors.inPageText,
            backgroundColor: "transparent",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.inPageText,
              borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.inPageText,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.inPageText,
            },
          },
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(135, 229, 239, 0.25)",
              border: `2px solid ${colors.inPageText}`,
              borderRadius: "8px",
            },
          },
          listbox: {
            sx: {
              backgroundColor: colors.pageBg,
              borderRadius: "8px",
              padding: 0,
              "& .MuiAutocomplete-option": {
                color: colors.inPageText,
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "rgba(135, 229, 239, 0.25)",
                },
              },
            },
          },
        }}
        inputValue={searchText}
        value={selectedStudent}
        loading={isLoading}
        options={searchResult}
        getOptionLabel={(option) => option.username}
        onInputChange={(_, value) => setSearchText(value)}
        onChange={(_, value) => setSelectedStudent(value)}
        renderInput={(params) => <TextField {...params} />}
      />

      <Button
        variant="contained"
        disabled={!selectedStudent}
        sx={{
          borderRadius: "8px",
          fontWeight: 700,
          backgroundColor: colors.accent,
          color: colors.pageBg,
          "&:hover": {
            backgroundColor: colors.line,
            opacity: 0.9,
          },
          "&:disabled": {
            backgroundColor: "gray",
            opacity: 0.4,
          },
        }}
        onClick={() => {
          if (!selectedStudent) return;
          addEnrollment.mutate(selectedStudent.id, {
            onSuccess: () => {
              setSearchText("");
              setSelectedStudent(null);
              setErrorMsg("");
            },
            onError: (error) => setErrorMsg(error.message),
          });
        }}
      >
        ADD
      </Button>

      {errorMsg && (
        <p style={{ color: "red", marginTop: 8, fontWeight: 600 }}>
          {errorMsg}
        </p>
      )}
    </Box>
  );
};