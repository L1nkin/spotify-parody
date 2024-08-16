import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
  background-color: #121212;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-radius: 10px;
`;

export const NavbarBrand = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

export const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1em;

  &.active {
    color: #1db954;
  }

  &:hover {
    color: #1ed760;
  }
`;

export const LogoutButtonStyled = styled.div`
  color: #fff;
  text-decoration: none;
  font-size: 1.1em;
  cursor: pointer;

  &.active {
    color: #1db954;
  }

  &:hover {
    color: #1ed760;
  }
`;

export const BrandLinkStyled = styled(NavLinkStyled)`
  color: #fff;
  text-decoration: none;
`;

export const SearchContainer = styled.form`
  display: flex;
  background-color: #2c2c2c;
  border-radius: 20px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  font-size: 1em;
  border: none;
  outline: none;
  width: 300px; /* Increase the width significantly */
  background-color: #2c2c2c;
  color: #fff;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    background-color: #3a3a3a;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: #1ed760;
  border: none;
  color: #fff;
  cursor: pointer;

  svg {
    font-size: 1.2em;
  }

  &:hover {
    background-color: #17b84d;
  }
`;
