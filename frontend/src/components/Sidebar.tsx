import '../styles/Sidebar.css';
import { SidebarData } from './SidebarData.tsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const unreadMessages = 3;

  return (
    <div className="Sidebar">
      <br></br><br></br>
      <div className="sidebar-logo">DrillMaster</div>
      <br></br><br></br>
      <br></br><br></br>
      <br></br>
      <div className="sidebar-menu">MENU</div>
      <ul className="SidebarTabs">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className={`tab ${activeTab === val.link ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(val.link);
              window.location.pathname = val.link;
            }}
          >
            {activeTab === val.link && <div className="active-tab"></div>}
            <div>{val.icon}</div>
            <div className="tab-title">
              {val.title}
              {val.title === "Messages" && unreadMessages > 0 && (
                <div className="message-badge"></div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
