import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  NavbarContainer,
  NavbarBrand,
  NavbarLinks,
  NavLinkStyled,
  BrandLinkStyled,
  LogoutButtonStyled,
} from "./Navbar.styles";
import { AuthContext, PlayerContext, TracksContext } from "../../App";

const Navbar: React.FC = () => {
  const { setAuth } = useContext(AuthContext);
  const { setCurrentTrack, setTracks } = useContext(TracksContext);
  const { setIsPlaying } = useContext(PlayerContext);

  const handleLogout = () => {
    localStorage.clear();
    setCurrentTrack(undefined);
    setTracks(undefined);
    setIsPlaying(false);
    setAuth(false);
  };
  return (
    <NavbarContainer>
      <BrandLinkStyled to="/" end>
        <NavbarBrand>FSpotify</NavbarBrand>
      </BrandLinkStyled>
      <NavbarLinks>
        <LogoutButtonStyled onClick={handleLogout}>Logout</LogoutButtonStyled>
        <NavLinkStyled to="/search">
          <FontAwesomeIcon icon={faSearch} />
        </NavLinkStyled>
        <NavLinkStyled to="/profile">
          <FontAwesomeIcon icon={faUser} />
        </NavLinkStyled>
      </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;
