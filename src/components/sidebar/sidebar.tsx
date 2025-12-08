import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "250px" : "80px")};
  background-color: #1f1f1f;
  color: #fff;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #333;
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 8px;
  flex: 1;
`;

const NavItem = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${(props) => (props.isActive ? "#1677ff" : "transparent")};
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  white-space: nowrap;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0d6ae6" : "#333")};
  }

  svg {
    min-width: 24px;
    width: 24px;
    height: 24px;
  }
`;

const NavLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Icon components
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const PlanningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7H7v2h7v-2zm6-2H7v2h12v-2z" />
  </svg>
);

const CreativeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

const WorkflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const SchedulerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
  </svg>
);

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItemConfig[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Planning",
      path: "/planning",
      icon: <PlanningIcon />,
    },
    {
      label: "Creative Studio",
      path: "/creativeStudio",
      icon: <CreativeIcon />,
    },
    {
      label: "Workflow Center",
      path: "/workflowCenter",
      icon: <WorkflowIcon />,
    },
    {
      label: "Scheduler",
      path: "/scheduler",
      icon: <SchedulerIcon />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar} title="Toggle Sidebar">
        {isOpen ? "✕" : "☰"}
      </ToggleButton>

      <NavList>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            isActive={isActive(item.path)}
            title={item.label}
          >
            {item.icon}
            {isOpen && <NavLabel>{item.label}</NavLabel>}
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;