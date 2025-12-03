import { Box } from "@mui/system";
import { drawerWidth, colors, headerHeight } from "../shared/constants";
import { NavItem } from "../shared/navItems";
import { SideBar } from "../shared/Sidebar";
import { Header } from "../shared/Header";
import { ReactNode } from "react";

export const BaseAppLayout = ({
  username,
  navItems,
  children,
}: {
  username: string;
  navItems: NavItem[];
  children?: ReactNode;
}) => {
  return (
    <Box sx={{ position: "relative", width: "100vw", minHeight: "100vh", bgcolor: colors.pageBg }}>
      <Header username={username} />
      <SideBar navItems={navItems} />
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, mt: `${headerHeight}px`, padding: "24px", pb: 6, color: colors.inPageText }}>
        {children}
      </Box>
    </Box>
  );
};