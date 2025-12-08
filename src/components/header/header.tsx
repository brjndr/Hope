import React, { useState } from "react";
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

import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/useAuth";

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

const Header: React.FC = () => {
  const [productAnchor, setProductAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const notificationCount = 3;

  const getInitials = (name?: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ minHeight: 72, px: 3 }}>
        {/* Left */}
        <Left>
          <ProductButton
            onClick={(e) => setProductAnchor(e.currentTarget)}
            variant="contained"
            aria-haspopup="true"
          >
            <LogoIcon>A</LogoIcon>
            Ajio Hope
            <KeyboardArrowDown fontSize="small" />
          </ProductButton>

          <Menu
            anchorEl={productAnchor}
            open={Boolean(productAnchor)}
            onClose={() => setProductAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem onClick={() => navigate("/product/jio-telecom")}>
              Jio Telecom
            </MenuItem>
            <MenuItem onClick={() => navigate("/product/reliance-retail")}>
              Reliance Retail
            </MenuItem>
            <MenuItem onClick={() => navigate("/product/jiomart")}>
              Jio Mart
            </MenuItem>
          </Menu>
        </Left>

        {/* Right */}
        <Right>
          <RoundIconButton>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsNoneOutlined />
            </Badge>
          </RoundIconButton>

          <RoundIconButton onClick={() => navigate("/settings")}>
            <SettingsOutlined />
          </RoundIconButton>

          <Box>
            <Button
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              startIcon={<Avatar sx={{ width: 32, height: 32 }}>{getInitials(user?.name)}</Avatar>}
              endIcon={<KeyboardArrowDown />}
              sx={{
                textTransform: "none",
                p: "6px 8px",
                borderRadius: 2,
                color: "#333",
                "&:hover": { background: "#f5f5f5" },
              }}
            >
              <ProfileName>{user?.name ?? "User"}</ProfileName>
            </Button>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>

              <Box sx={{ borderTop: "1px solid #eee", my: 1 }} />

              <MenuItem onClick={logout}>
                <Logout fontSize="small" />
                <span style={{ marginLeft: 8 }}>Logout</span>
              </MenuItem>
            </Menu>
          </Box>
        </Right>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;