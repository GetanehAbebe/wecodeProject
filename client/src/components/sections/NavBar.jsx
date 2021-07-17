
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
      <Navbar bg="light" expand="lg" className='sticky-top '>
        <Navbar.Brand href="/">Getnio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav menu">
          <Nav className="mr-auto ">
            <Nav.Link href="/" className='menu active'>Home</Nav.Link>
            <Nav.Link to='/login' href="/products">Gallery</Nav.Link>
            {isLoged && <Nav.Link href="/new-recipe">add recipe</Nav.Link>}
            {isLoged && <Nav.Link href="/myrecipes">my Recipes</Nav.Link>}
            <SearchRecipes />
          </Nav>
          {<Nav.Link href="/profile">{isLoged ? "Profile" : "login"}</Nav.Link>}
          {!isLoged ? <Nav.Link href='/sign-up'>sign up</Nav.Link> : <Nav.Link onClick={logOut}>log out</Nav.Link>}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navbar1;
