import React, { useState, type MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/useAuth";

/* ----- Styled with MUI styled() ----- */
const StyledAppBar = styled(AppBar)(() => ({
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  borderBottom: "1px solid #f0f0f0",
  color: "#333",
}));

const Left = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 24,
  flex: 1,
}));

const Right = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
}));

const LogoIcon = styled("div")(() => ({
  width: 36,
  height: 36,
  background: "linear-gradient(135deg, #1673ff 0%, #062e6c 100%)",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: 700,
  fontSize: 16,
}));

const ProductButton = styled(Button)(() => ({
  textTransform: "none",
  padding: "8px 12px",
  borderRadius: 6,
  background: "#f5f5f5",
  border: "1px solid #d9d9d9",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: 8,
  "&:hover": {
    background: "#e6f7ff",
    borderColor: "#1677ff",
  },
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const RoundIconButton = styled(IconButton)(() => ({
  width: 40,
  height: 40,
  borderRadius: 6,
  color: "#666",
  "&:hover": {
    background: "#f5f5f5",
    color: "#1677ff",
  },
}));

/* ----- SVG icons ----- */
const NotificationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden>
    <path d="M19.14,12.94c.04,-0.3 .06,-0.61 .06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c.18,-0.14 .23,-0.41 .12,-0.64l-1.92,-3.32c-0.12,-0.22 -0.37,-0.29 -0.59,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.47,0 -0.59,0.22L2.74,8.87C2.62,9.08 2.66,9.34 2.86,9.48l2.03,1.58C4.84,11.36 4.8,11.69 4.8,12s.02,.64 .07,.94l-2.03,1.58c-0.18,.14 -0.23,.41 -0.12,.64l1.92,3.32c.12,.22 .37,.29 .59,.22l2.39,-0.96c.5,.38 1.03,.7 1.62,.94l.36,2.54c.05,.24 .24,.41 .48,.41h3.84c.24,0 .44,-0.17 .47,-0.41l.36,-2.54c.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,.96c.22,.08 .47,0 .59,-0.22l1.92,-3.32c.12,-0.22 .07,-0.5 -0.12,-0.64L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6s3.6,1.62 3.6,3.6S13.98,15.6 12,15.6z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

/* ----- Component ----- */
const Header: React.FC = () => {
  const [productAnchor, setProductAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const notificationCount = 3;

  const handleProductOpen = (e: MouseEvent<HTMLElement>) => setProductAnchor(e.currentTarget);
  const handleProductClose = () => setProductAnchor(null);

  const handleProfileOpen = (e: MouseEvent<HTMLElement>) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  const handleLogout = () => {
    logout();
    handleProfileClose();
  };

  const getInitials = (name?: string): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ minHeight: 72, px: 3 }}>
        <Left>
          <ProductButton
            aria-controls={productAnchor ? "product-menu" : undefined}
            aria-haspopup="true"
            onClick={handleProductOpen}
            variant="contained"
          >
            <LogoIcon>A</LogoIcon>
            <Box component="span" sx={{ mx: 0.5 }}>
              Ajio Hope
            </Box>
            <ChevronDown />
          </ProductButton>

          <Menu
            id="product-menu"
            anchorEl={productAnchor}
            open={Boolean(productAnchor)}
            onClose={handleProductClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={() => { handleProductClose(); navigate("/product/jio-telecom"); }}>
              Jio Telecom
            </MenuItem>
            <MenuItem onClick={() => { handleProductClose(); navigate("/product/reliance-retail"); }}>
              Reliance Retail
            </MenuItem>
            <MenuItem onClick={() => { handleProductClose(); navigate("/product/jiomart"); }}>
              Jio Mart
            </MenuItem>
          </Menu>
        </Left>

        <Right>
          <RoundIconButton aria-label="notifications" title="Notifications">
            <Badge badgeContent={notificationCount} color="error" overlap="circular">
              <NotificationIcon />
            </Badge>
          </RoundIconButton>

          <RoundIconButton aria-label="settings" title="Settings" onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </RoundIconButton>

          <Box>
            <Button
              onClick={handleProfileOpen}
              aria-controls={productAnchor ? "profile-menu" : undefined}
              aria-haspopup="true"
              startIcon={<Avatar sx={{ width: 32, height: 32 }}>{getInitials(user?.name)}</Avatar>}
              endIcon={<ChevronDown />}
              sx={{
                textTransform: "none",
                padding: "6px 8px",
                borderRadius: "6px",
                color: "#333",
                background: "none",
                "&:hover": { background: "#f5f5f5" },
              }}
            >
              <ProfileName>{user?.name || "User"}</ProfileName>
            </Button>

            <Menu
              id="profile-menu"
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => { handleProfileClose(); navigate("/profile"); }}>
                👤 Profile
              </MenuItem>
              <MenuItem onClick={() => { handleProfileClose(); navigate("/settings"); }}>
                ⚙️ Settings
              </MenuItem>
              <Box sx={{ borderTop: "1px solid #f0f0f0", my: 1 }} />
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LogoutIcon />
                  <span>Logout</span>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Right>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;