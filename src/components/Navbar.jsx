import styled from "styled-components";
import {
  FaBars,
  FaHome,
  FaInfoCircle,
  FaBox,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  height: 70px;
  background-color: rgba(0, 0, 0, 0.85);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9),
    rgba(50, 9, 74, 0.8)
  );
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;


const Logo = styled(NavLink)`
  color: #fff;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: #ad34eb;
  }

  &:hover {
    color: #ad34eb;
    transition: all 0.3s ease;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled(NavLink)`
  margin-left: 16px;
  background-color: transparent;
  color: #fff;
  font-size: 0.95rem;
  padding: 8px 16px;
  border: 1.5px solid transparent;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  font-weight: 500;

  svg {
    margin-right: 6px;
    font-size: 1rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #ad34eb;
    color: #ad34eb;
    transform: translateY(-2px);
  }

  &.active {
    background-color: #ad34eb;
    color: #fff;
    border-color: #ad34eb;
    box-shadow: 0 4px 10px rgba(173, 52, 235, 0.3);

    &:hover {
      background-color: #9028c6;
      color: #fff;
    }
  }
`;

const MenuIcon = styled.div`
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  display: none;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ad34eb;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.95);
    position: absolute;
    top: 70px;
    right: 0;
    width: 100%;
    padding: 10px 0;
    transition: all 0.3s ease-in-out;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(173, 52, 235, 0.3);
    border-radius: 0 0 10px 10px;
    animation: ${({ isOpen }) => (isOpen ? "slideDown 0.3s ease" : "none")};

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const MobileMenuItem = styled(NavLink)`
  padding: 15px 25px;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
    color: #ad34eb;
  }

  &:hover {
    color: #ad34eb;
    background-color: rgba(255, 255, 255, 0.05);
    padding-left: 30px;
  }

  &.active {
    color: #ad34eb;
    border-left: 3px solid #ad34eb;
    background-color: rgba(173, 52, 235, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Navbar = ({ isOpen, toggle }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [auth]);

  const logOut = () => {
    auth.signOut();
  };

  return (
    <>
      <Nav
        style={{
          height: scrolled ? "60px" : "70px",
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : undefined,
        }}
      >
        <Logo to="/">
          <FaHome /> HOMZY
        </Logo>
        <MenuItems>
          <MenuItem to="/about">
            <FaInfoCircle /> About
          </MenuItem>
          <MenuItem to="/package">
            <FaBox /> Packages
          </MenuItem>
          {user ? (
            <>
              <MenuItem to="/profile">
                <FaUserCircle /> Profile
              </MenuItem>
              <MenuItem as="div" onClick={logOut} style={{ cursor: "pointer" }}>
                <FaSignOutAlt /> Log Out
              </MenuItem>
            </>
          ) : (
            <MenuItem to="/sign-in">
              <FaSignInAlt /> Sign In
            </MenuItem>
          )}
        </MenuItems>
        <MenuIcon onClick={toggle}>
          <FaBars />
        </MenuIcon>
      </Nav>

      <MobileMenu isOpen={isOpen}>
        <MobileMenuItem to="/about">
          <FaInfoCircle /> About
        </MobileMenuItem>
        <MobileMenuItem to="/package">
          <FaBox /> Packages
        </MobileMenuItem>
        {user ? (
          <>
            <MobileMenuItem to="/profile">
              <FaUserCircle /> Profile
            </MobileMenuItem>
            <MobileMenuItem
              as="div"
              onClick={logOut}
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt /> Log Out
            </MobileMenuItem>
          </>
        ) : (
          <MobileMenuItem to="/sign-in">
            <FaSignInAlt /> Sign In
          </MobileMenuItem>
        )}
      </MobileMenu>
    </>
  );
};

export default Navbar;
