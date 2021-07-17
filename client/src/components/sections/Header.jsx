import React from "react";
// import "../App.css";
import "./HeroSection.css";
import { Button } from "react-bootstrap";
import SearchRecipes from "./SearchRecipes";
function Header() {
  return (
    <div className="hero-container">
      {/* <video src="../images/video1.mp4" autoPlay loop muted /> */}
      <h1></h1>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Get Started
        </Button>
        {/* <div className="btns">{<App1 />}</div> */}


        {/* <Button
          className="btns"
          buttonStyle="btn-primary"
          buttonSize="btn-large"
          onClick={console.log("hey")}
        >
          התחל לסייר
        </Button> */}
      </div>
      {/* <div className='w-100'>
        <SearchRecipes />
      </div> */}

    </div>
  );
}

export default Header;
