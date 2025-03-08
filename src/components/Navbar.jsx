import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Removed useLocation

const Nav = styled.nav`
  height: 80px;
  background-color: #000; /* Black background */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: bold;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled(Link)`
  margin-left: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: 2px solid #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const MenuIcon = styled.div`
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ isOpen, toggle }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const logOut = () => {
    auth.signOut();
  };

  return (
    <Nav>
      <Logo to="/">HOMZY</Logo>
      <MenuItems>
        <MenuItem to="/">About</MenuItem>
        <MenuItem to={user ? "/profile" : "/sign-up"}>
          {user ? "Profile" : "Explore"}
        </MenuItem>
        {user ? (
          <MenuItem to="/" onClick={logOut}>
            Log Out
          </MenuItem>
        ) : (
          <MenuItem to="/sign-in">Sign In</MenuItem>
        )}
      </MenuItems>
      <MenuIcon onClick={toggle}>
        <FaBars />
      </MenuIcon>
    </Nav>
  );
};

export default Navbar;
