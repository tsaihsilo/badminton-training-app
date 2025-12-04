import { AppBar, Toolbar, Typography } from "@mui/material";
import { drawerWidth, headerHeight, colors } from "./constants";

export const Header = ({ username }: { username: string }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        height: headerHeight,
        bgcolor: colors.pageBg,
        boxShadow: `inset 0 -1px 0 ${colors.line}`,
        pl: `${drawerWidth}px`,
        pr: 3,
        zIndex: theme.zIndex.drawer - 1,
      })}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: colors.accent, fontWeight: 500 }}>
          Hi, {username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};