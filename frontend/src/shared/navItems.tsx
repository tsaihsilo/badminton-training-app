import PeopleIcon from '@mui/icons-material/People';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
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
  { title: "Manage Students", icon: <PeopleIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/manage-students" },
  { title: "Tutorial Videos", icon: <VideocamOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/tutorial-videos" },
  { title: "Assign Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/assign-drills" },
  { title: "Sign Out", action: logoutAction },
]

export const studentNavItems: NavItem[] = [
  { title: "Assigned Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/student/assigned-drills" },
  { title: "Sign Out", action: logoutAction },
]