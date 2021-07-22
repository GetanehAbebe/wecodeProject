import React from "react";

// import "../App.css";
import "./HeroSection.css";
import { Button } from "react-bootstrap";
import SearchRecipes from "./SearchRecipes";
function Header() {
  return (

    <div className="hero-container">
      <h3>search,find and Cook&Eat</h3>
      {/* <video src="../images/video1.mp4" autoPlay loop muted /> */}
      <div className='w-75'>
        <SearchRecipes />
      </div>
    </div>
  );
}

export default Header;
