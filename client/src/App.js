import React, { useContext, useEffect } from "react";
import Navbar from "./components/sections/NavBar";
import { useState } from "react";
// import "./App.css";
import Home from "./components/Pages/Home";
import FormikNewRecipe from './components/forms/FormikNewRecipe'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import RecipePage from './components/Pages/RecipePage'
import RegisterForm from "./components/forms/RegisterForm";
import NewRecipeForm from "./components/forms/NewRecipeForm";
import MyRecipes from "./components/Pages/MyRecipes"
import Login from "./components/forms/Login";
import Cart from "./components/Pages/Cart/Cart";
import ItemDetails from "./components/utills/ItemDetails";
import EditRecipe from "./components/forms/EditRecipe";
import SearchRecipes from "./components/sections/SearchRecipes";
import Basket from "./components/Pages/Cart/Basket";
import Profile from "./components/Pages/Profile";
import Gallery from "./components/Pages/Gallery";
import LocalCart from "./components/Pages/Cart/LocalCart";
import AuthApi from "./components/context/AuthApi";
import Cookies from 'js-cookie'
import Details from './components/utills/Details'
import Form from './components/forms/Image'
const Routes = () => {
  const Auth = useContext(AuthApi)
  // return <Router>
  //  
  return <div>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      {/* </Switch><Route path="/products" exact component={</SearchRecipes>} /> */}
      <Route exact path="/products" ><Gallery /></Route>
      <Route path="/myrecipes" ><MyRecipes /></Route>
      
      <Route path="/page" ><Details /></Route>
      <Route path="/formik" ><FormikNewRecipe /></Route>
      <Route path="/new-recipe" component={NewRecipeForm} />
      <Route path="/sign-up" component={RegisterForm} />
      <Route path="/cart/:id" component={Cart} />
      <Route path="/basket" exact component={Basket} />
      <Route path="/products/:id" component={ItemDetails} />
      <Route path="/edit/:id" component={EditRecipe} />
      <Route path="/new-recipe" conponent={NewRecipeForm} />
      <Route path="/newcart" component={LocalCart} />
      <ProtectedProfile path='/profile' exact auth={Auth.auth} component={Profile} />
      <ProtectedLogin path='/login' auth={Auth.auth} component={Login} />
    </Switch>
  </div >
}

const myRecipesProtected = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !!auth ? (
        < Component />) : (<Redirect to={'/login'} />)}
    />)
}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        < Component />) : (<Redirect to={'/profile'} />)}
    />)
}

const ProtectedProfile = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        < Component />) : <Redirect to={'/login'}
      />}
    />)
}

function App() {
  const [auth, setAuth] = useState(false)
  const readCookie = () => {
    const user = Cookies.get('user');
    if (user) setAuth(true)
  }

  useEffect(() => {
    readCookie()
  }, [])
  return <div>
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router >
        <Routes />
      </Router >
    </AuthApi.Provider>
  </div>
}

export default App;
