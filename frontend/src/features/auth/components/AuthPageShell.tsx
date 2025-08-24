import { Box, Container, Typography } from "@mui/material"

export const AuthPageShell = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "fixed", inset: 0,
        bgcolor: "rgb(49, 62, 70)",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          sx={{ 
            mb: 2, 
            color: "rgba(243, 227, 8, 1)", 
            textAlign: "center" 
          }}
        >
          {title}
        </Typography>

        {children}
      </Container>
    </Box>
  )
}