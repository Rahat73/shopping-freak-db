// import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
  };
  return (
    <nav className="header">
      <h1>Shopping freak</h1>
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        {user && (
          <>
            <p className="current-user">{user.email}</p>
            <button onClick={handleLogOut}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
