
import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import './navbar.css'
import { Link, useHistory } from "react-router-dom";
import SearchRecipes from './SearchRecipes'
import AuthApi from "../context/AuthApi";
import Cookies from 'js-cookie'
function Navbar1() {
  const Auth = useContext(AuthApi)
  const history = useHistory()
  const [isLoged, setIsLoged] = useState(false)
  useEffect(() => {
    const user = Cookies.get("user")
    if (user) setIsLoged(true)
  }, [])

  const logOut = () => {
    Auth.setAuth(false);
    Cookies.remove("user")
    history.push('/')
    setIsLoged(false)
  }
  return (
    <>
      <div className="hero-anime">
        <div className="navigation-wrap bg-light start-header start-style">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-sm navbar-light">
                  <Link to="/" className="social-logo">
                    Cook&Eat
                    <i className="fab fa-typo3" />
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto py-1 py-md-0">
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                        <a className="nav-link" href="/">Home</a>
                      </li>
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a className="nav-link" href="/products">Gallery</a>
                      </li>
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a className="nav-link" href="/search"><i className="fas fa-search"></i></a>
                      </li>
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        {!isLoged ? <a className="nav-link" href="/login">Login</a> : <>
                          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user-circle"></i></a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="/profile">Profile</a>
                            <a className="dropdown-item" href="/myrecipes">my Recipes</a>
                            <a className="dropdown-item" href="/new-recipe">add Recipe</a>
                            <a className="dropdown-item" href="/myfavorites">favorites</a>
                          </div>
                        </>
                        }
                      </li>
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        {isLoged ? <a className="nav-link" onClick={logOut}>log out</a> : <a className="nav-link" href="/sign-up">sign up</a>}
                      </li>

                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div > </div>
      </div>
    </>
  );
}

export default Navbar1;
