import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BrushIcon from "@mui/icons-material/Brush";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const OPEN_WIDTH = 250;
const CLOSED_WIDTH = 72;

/* to change header height, update this const. */
const HEADER_HEIGHT = 72;

const Root = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  // keep header inside the drawer aligned with header height
  minHeight: HEADER_HEIGHT - 8,
}));

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItemConfig[] = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Planning", path: "/planning", icon: <EventNoteIcon /> },
    { label: "Creative Studio", path: "/creativeStudio", icon: <BrushIcon /> },
    { label: "Workflow Center", path: "/workflowCenter", icon: <WorkOutlineIcon /> },
    { label: "Scheduler", path: "/scheduler", icon: <CalendarTodayIcon /> },
  ];

  const toggleSidebar = () => setIsOpen((s) => !s);

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) navigate(path);
  };

  return (
    <Root>
      <Drawer
        variant="permanent"
        slotProps={{
          paper: {
            sx: (theme) => ({
            position: "fixed",
            top: `${HEADER_HEIGHT}px`,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            width: isOpen ? OPEN_WIDTH : CLOSED_WIDTH,
            overflowX: "hidden",
            transition: theme.transitions.create(["width", "top", "height"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
            zIndex: theme.zIndex.appBar - 1,
          }),
          }
        }}
        sx={{
          width: isOpen ? OPEN_WIDTH : CLOSED_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isOpen ? OPEN_WIDTH : CLOSED_WIDTH,
          },
        }}
      >
        <Box component="nav" sx={{ flex: 1, overflowY: "auto", mt: 1, pt: 1 }}>
          <List disablePadding>
            {navItems.map((item) => {
              const selected = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    selected={selected}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      minHeight: 48,
                      justifyContent: isOpen ? "initial" : "center",
                      px: 2,
                      mx: 1,
                      borderRadius: 1,
                      "&.Mui-selected": {
                        backgroundColor: (theme) => theme.palette.action.selected,
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.action.selected,
                        },
                      },
                    }}
                    aria-current={selected ? "page" : undefined}
                    title={item.label}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isOpen ? 2 : 0,
                        justifyContent: "center",
                        color: selected ? "primary.main" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {isOpen && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider />
        
        <DrawerFooter>
          <Tooltip title={isOpen ? "Collapse" : "Open"}>
            <IconButton
              onClick={toggleSidebar}
              size="small"
              aria-label={isOpen ? "Collapse sidebar" : "Open sidebar"}
              sx={{
                marginLeft: "auto",
                borderRadius: 1,
                bgcolor: "transparent",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </DrawerFooter>
      </Drawer>
    </Root>
  );
};

export default Sidebar;