import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { queryClient } from '../lib/queryClient';

export type NavItem = {
  title: string;
  icon?: React.ReactElement; 
  link?: string;
  badge?: number;
  action?: () => void;
}

const logoutAction = async () => {
  localStorage.removeItem("token");
  queryClient.clear();
  window.location.href = "/auth/login";
}

export const instructorNavItems: NavItem[] = [
  { title: "Demo Videos", icon: <VideocamOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/demo-videos" },
  { title: "Assign Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/assign-drills" },
  { title: "Messages", icon: <SmsOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/messages", badge: 3 }, // fix
  { title: "Sign Out", action: logoutAction },
]

export const studentNavItems: NavItem[] = [
  { title: "Assigned Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/student/assigned-drills" },
  { title: "Messages", icon: <SmsOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/student/messages", badge: 3 }, // fix
  { title: "Sign Out", action: logoutAction },
]