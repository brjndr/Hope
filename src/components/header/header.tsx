import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/useAuth";

const HeaderContainer = styled.header`
  display: flex;
  height: 72px;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #f0f0f0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1673ff 0%, #062e6c 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 48px;
`;

const ProductDropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;

  &:hover {
    background: #e6f7ff;
    border-color: #1677ff;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  transition: all 0.2s;
  position: relative;
  border-radius: 6px;

  &:hover {
    background: #f5f5f5;
    color: #1677ff;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

const ProfileMenu = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px;

  &:hover {
    background: #f5f5f5;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1677ff 0%, #0d6ae6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
`;

const ProfileName = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  min-width: 200px;
  z-index: 1000;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 8px 0;
`;

const NotificationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.14,12.94c.04,-0.3 .06,-0.61 .06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c.18,-0.14 .23,-0.41 .12,-0.64l-1.92,-3.32c-0.12,-0.22 -0.37,-0.29 -0.59,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.47,0 -0.59,0.22L2.74,8.87C2.62,9.08 2.66,9.34 2.86,9.48l2.03,1.58C4.84,11.36 4.8,11.69 4.8,12s.02,.64 .07,.94l-2.03,1.58c-0.18,.14 -0.23,.41 -0.12,.64l1.92,3.32c.12,.22 .37,.29 .59,.22l2.39,-0.96c.5,.38 1.03,.7 1.62,.94l.36,2.54c.05,.24 .24,.41 .48,.41h3.84c.24,0 .44,-0.17 .47,-0.41l.36,-2.54c.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,.96c.22,.08 .47,0 .59,-0.22l1.92,-3.32c.12,-0.22 .07,-0.5 -0.12,-0.64L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6s3.6,1.62 3.6,3.6S13.98,15.6 12,15.6z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const Header: React.FC = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
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
    <HeaderContainer>
      <Left>
        {/* Product Dropdown */}
        <ProductDropdown>
          <DropdownButton onClick={() => setIsProductOpen(!isProductOpen)}>
            <LogoIcon>A</LogoIcon>
            Ajio Hope
            <ChevronDown />
          </DropdownButton>
          <DropdownMenu isOpen={isProductOpen}>
            <DropdownItem onClick={() => setIsProductOpen(false)}>
              <span>📊</span> Analytics
            </DropdownItem>
            <DropdownItem onClick={() => setIsProductOpen(false)}>
              <span>📱</span> Mobile App
            </DropdownItem>
            <DropdownItem onClick={() => setIsProductOpen(false)}>
              <span>⚙️</span> Integrations
            </DropdownItem>
          </DropdownMenu>
        </ProductDropdown>
      </Left>

      <Right>
        {/* Notification Icon */}
        <IconButton title="Notifications">
          <NotificationIcon />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>

        {/* Settings Icon */}
        <IconButton
          title="Settings"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon />
        </IconButton>

        {/* Profile Menu */}
        <ProfileMenu>
          <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <Avatar>{getInitials(user?.name)}</Avatar>
            <ProfileName>{user?.name || "User"}</ProfileName>
            <ChevronDown />
          </ProfileButton>
          <ProfileDropdown isOpen={isProfileOpen}>
            <DropdownItem onClick={() => navigate("/profile")}>
              👤 Profile
            </DropdownItem>
            <DropdownItem onClick={() => navigate("/settings")}>
              ⚙️ Settings
            </DropdownItem>
            <Divider />
            <DropdownItem onClick={handleLogout}>
              <LogoutIcon /> Logout
            </DropdownItem>
          </ProfileDropdown>
        </ProfileMenu>
      </Right>
    </HeaderContainer>
  );
};

export default Header;