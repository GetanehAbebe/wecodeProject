
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
      {/* <Navbar expand="lg" className='sticky-top '>
        <Navbar.Brand href="/">Cook Eat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav menu">
          <Nav className="mr-auto ">
            <Nav.Link href="/" className='menu active'>Home</Nav.Link>
            <Nav.Link to='/login' href="/products">Gallery</Nav.Link>
            {isLoged && <Nav.Link href="/new-recipe">add recipe</Nav.Link>}
            {isLoged && <Nav.Link href="/myrecipes">my Recipes</Nav.Link>}

          </Nav>
          {<Nav.Link href="/profile">{isLoged ? "Profile" : "login"}</Nav.Link>}
          {!isLoged ? <Nav.Link href='/sign-up'>sign up</Nav.Link> : <Nav.Link onClick={logOut}>log out</Nav.Link>}
        </Navbar.Collapse>
      </Navbar> */}
      <div className="hero-anime">

        <div className="navigation-wrap bg-light start-header start-style">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-sm navbar-light">
                  <Link to="/" className="social-logo">
                    Cook&Eat
                    <i class="fab fa-typo3" />
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
                        <a className="nav-link" href="/search"><i class="fas fa-search"></i></a>
                      </li>
                      {/* <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-circle"></i></a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/products"><i class="fas fa-user-circle"></i></a>
                          {isLoged ? <a className="nav-link" href="/profile"><i class="fas fa-user-circle"></i></a> : <a className="nav-link" href="/login">Login</a>}
                          {isLoged && <a className="dropdown-item" href="/myrecipes">my Recipes</a>}
                          {isLoged && <a className="dropdown-item" href="/new-recipe">add Recipe</a>}
                          {isLoged && <a className="dropdown-item" href="/myfavorites">favorites</a>}
                        </div>
                      </li> */}
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        {!isLoged ? <a className="nav-link" href="/login">Login</a> : <>
                          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-circle"></i></a>
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
        {/* <div className="section full-height">
          <div className="absolute-center">
            <div className="section">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1><span>B</span><span>o</span><span>o</span><span>t</span><span>s</span><span>t</span><span>r</span><span>a</span><span>p</span> <span>4</span><br />
                      <span>m</span><span>e</span><span>n</span><span>u</span></h1>
                    <p>scroll for nav animation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="section mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div id="switch">
                      <div id="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="my-5 py-1">
        </div> */}


      </div>
    </>
  );
}

export default Navbar1;
