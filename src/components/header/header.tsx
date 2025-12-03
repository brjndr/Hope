import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    height: 72px;
    padding: 12.75px 24px;
    justify-content: center;
    align-items: center;
    gap: 531.094px;
    background: gray;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Logo = styled.span`
    font-weight: 600;
    font-size: 16px;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Left>
                <Logo>Logo</Logo>
            </Left>
            <Right>
                <div>Link 1</div>
                <div>Link 2</div>
            </Right>
        </HeaderContainer>
    );
};

export default Header;