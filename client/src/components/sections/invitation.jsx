import React from "react";
// import "../App.css";
import "./Invitation.css";
import { Button } from "react-bootstrap";

function Invitation() {
  return (
    <div className="hero-container1">
      <div className="hero-btns">
        <h1>You Can Add your own recipes</h1>
        <Button
          className="btns"
          buttonStyle="btn-primary"
          buttonSize="btn-large"
          href="/login"
          onClick={console.log("hey")}
        >
          Add Recipes
        </Button>
      </div>
    </div>
  );
}

export default Invitation;
