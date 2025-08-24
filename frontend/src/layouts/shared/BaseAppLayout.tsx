import { Box } from "@mui/system";
import { drawerWidth, colors, headerHeight } from "./constants";
import { NavItem } from "./navItems";
import { SideBar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const BaseAppLayout = ({
  username, 
  navItems, 
}: {
  username: string;
  navItems: NavItem[];
}) => {
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", bgcolor: colors.pageBg }}>
      <Header username={username} />
      <SideBar navItems={navItems} />
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, mt: `${headerHeight}px`, p: 3, color: colors.inPageText }}>
        <Outlet /> 
      </Box>
    </Box>
  )
}