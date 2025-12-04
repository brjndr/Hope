import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  margin-top: 120px;
  margin-left: 220px;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #1677ff;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  padding: 12px 26px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0d6ae6;
  }
`;
