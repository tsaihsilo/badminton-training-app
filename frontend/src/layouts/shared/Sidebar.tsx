import { useLocation, useNavigate } from "react-router-dom";
import { NavItem } from "./navItems";
import { drawerWidth, colors, headerHeight } from "./constants";
import {
  Badge, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography,
} from "@mui/material";

export const SideBar = ({ navItems }: { navItems: NavItem[] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const top = navItems.filter(i => i.title !== "Sign Out");
  const bottom = navItems.filter(i => i.title === "Sign Out");

  const handleClick = (item: NavItem) => {
    if (item.action) return item.action();
    if (item.link) return navigate(item.link);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: "fixed",
          top: 0,
          height: "100vh",
          width: drawerWidth,
          bgcolor: colors.sidebarBg,
          color: colors.accent,
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          height: `${headerHeight}px`,
          display: "flex",
          alignItems: "center",
          px: 3,
          boxShadow: `inset 0 -1px 0 ${colors.line}`,  
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: colors.accent, ml: 6.5, fontSize: 42 }}>
          🏸🏸🏸
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{ mb: 1.5, px: 3, pt: 5, pb: 2, pl: 4.3, color: colors.accent, opacity: 0.65, fontSize: 13 }}
      >
        MENU
      </Typography>

      <List disablePadding>
        {top.map((item) => {
          const selected = item.link
            ? location.pathname === item.link || location.pathname.startsWith(item.link + "/")
            : false;

          return (
            <ListItemButton
              key={item.title}
              selected={selected}
              onClick={() => handleClick(item)}
              sx={{
                mx: 2,
                mb: 1.5,
                borderRadius: 2,
                height: 56,
                "&.Mui-selected": { bgcolor: colors.hover },
                "&:hover": { bgcolor: colors.hover },
              }}
            >
              <ListItemIcon sx={{ ml: 2, minWidth: 40, color: colors.accent }}>
                {item.badge ? (
                  <Badge variant="dot" color="error" overlap="circular" invisible={!item.badge}>
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ sx: { ml: 1, color: colors.accent, fontSize: 18, fontWeight: 300 } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {!!bottom.length && (
        <List disablePadding sx={{ mb: 4 }}>
          {bottom.map((item) => (
            <ListItemButton
              key={item.title}
              onClick={() => handleClick(item)}
              sx={{ mx: 2, borderRadius: 2, height: 56, "&:hover": { bgcolor: colors.hover } }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ sx: { ml: 9, color: colors.accent, fontSize: 18, fontWeight: 300 } }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Drawer>
  );
};