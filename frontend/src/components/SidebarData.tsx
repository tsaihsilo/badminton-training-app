// import React from 'react'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

export const SidebarData = [
  {
    title: "Student Progress",
    icon: <PeopleAltOutlinedIcon style={{ fontSize: 30 }}/>,
    link: "/studentProgress"
  }, 
  {
    title: "Demo Videos",
    icon: <VideocamOutlinedIcon style={{ fontSize: 30 }}/>,
    link: "/demoVideos"
  },
  {
    title: "Assign Drills",
    icon: <AssignmentTurnedInOutlinedIcon style={{ fontSize: 30 }}/>,
    link: "/assignDrills"
  },
  {
    title: "Messages",
    icon: <SmsOutlinedIcon style={{ fontSize: 30 }}/>,
    link: "/messages"
  }
]

