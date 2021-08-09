import React from "react";

// import "../App.css";
import "./HeroSection.css";
import { Button } from "react-bootstrap";
import SearchRecipes from "./SearchRecipes";
function Header() {
  return (
    <div className="hero-container">
      <h3>search,find and Cook&Eat</h3>
      <div className='w-50'>
        <SearchRecipes />
      </div>
    </div>
  );
}

export default Header;
