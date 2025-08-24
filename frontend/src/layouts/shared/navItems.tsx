// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

export type NavItem = {
  title: string;
  icon?: React.ReactElement; 
  link?: string;
  badge?: number;
  action?: () => void;
}

export const instructorNavItems: NavItem[] = [
  // { title: "Student Progress", icon: <PeopleAltOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/student-progress" },
  { title: "Demo Videos", icon: <VideocamOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/demo-videos" },
  { title: "Assign Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/assign-drills" },
  { title: "Messages", icon: <SmsOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/instructor/messages", badge: 3 }, // fix
]

export const studentNavItems: NavItem[] = [
  { title: "Assigned Drills", icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/student/assigned-drills" },
  { title: "Messages", icon: <SmsOutlinedIcon sx={{ fontSize: 31 }} />, link: "/app/student/messages", badge: 3 }, // fix
]