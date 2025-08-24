import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { signupMutation } from "../api/signupMutation";

import { textFieldStyles } from "../styles/textFieldStyles";
import { mapFieldErrors } from "../utils/mapFieldErrors";

import { 
  Box, Button, Link, MenuItem, TextField, Grid,
} from "@mui/material";

import { AuthPageShell } from "../components/AuthPageShell";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [is_instructor, setIs_instructor] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
    is_instructor?: string;
  }>({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: signupMutation,
    onSuccess: (session) => {
      queryClient.setQueryData(["authSession"], session);
      navigate(session.isInstructor ? "/app/instructor" : "/app/student", { replace: true });
    },
    onError: (error: unknown) => {
      setFormErrors(mapFieldErrors(error, ["username", "password", "is_instructor"]));
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ username, password, is_instructor });
  }

  return (
    <AuthPageShell title="Sign Up">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Username"
              value={username} onChange={e => setUsername(e.target.value)}
              error={!!formErrors.username} helperText={formErrors.username}
              {...textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required fullWidth label="Password" type="password"
              value={password} onChange={e => setPassword(e.target.value)}
              error={!!formErrors.password} helperText={formErrors.password}
              {...textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required fullWidth select label="Role"
              value={is_instructor ? "Instructor" : "Student"}
              onChange={(e) => setIs_instructor(e.target.value === "Instructor")}
              error={!!formErrors.is_instructor}
              helperText={formErrors.is_instructor}
              {...textFieldStyles}
            >
              <MenuItem value="Instructor">Instructor</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button
          fullWidth type="submit" variant="contained" disabled={isPending}
          sx={{
            mt: 4, mb: 2,
            bgcolor: "rgba(243, 227, 8, 1)", color: "rgb(49, 62, 70)",
            "&:hover": { bgcolor: "rgba(180, 160, 0, 0.6)" },
          }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="flex-start">
          <Grid item>
            <Link component={RouterLink} to="/auth/login" sx={{ color: "rgba(243, 227, 8, 1)" }}>
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthPageShell>
  );
};