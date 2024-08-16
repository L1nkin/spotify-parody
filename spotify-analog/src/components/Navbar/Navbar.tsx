import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
    NavbarContainer,
    NavbarBrand,
    NavbarLinks,
    NavLinkStyled,
    BrandLinkStyled,
    LogoutButtonStyled,
} from './Navbar.styles';
import { AuthContext } from '../../App';

const Navbar: React.FC = () => {
    const {setAuth} = useContext(AuthContext)


    const handleLogout = () => {
        localStorage.removeItem('token')
        setAuth(false)
    }
    return (
        <NavbarContainer>
            <BrandLinkStyled to="/" end>
                <NavbarBrand>MyApp</NavbarBrand>
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