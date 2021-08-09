import React, { useContext, useEffect } from "react";
import Navbar from "./components/sections/NavBar";
import { useState } from "react";
import Home from "./components/Pages/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import NewRecipeForm from "./components/forms/NewRecipeForm";
import MyRecipes from "./components/Pages/MyRecipes"
import Login from "./components/forms/Login";
import ItemDetails from "./components/utills/ItemDetails";
import EditRecipe from "./components/forms/EditRecipe";
import Search from './components/Pages/Search'
import MyFovorites from './components/Pages/MyFavorites'
import Gallery from "./components/Pages/Gallery";
import Profile from './components/Pages/Profile'
import AuthApi from "./components/context/AuthApi";
import Cookies from 'js-cookie'


const Routes = () => {
  const Auth = useContext(AuthApi)
  return <div>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/products" ><Gallery /></Route>
      <Route path="/myrecipes" ><MyRecipes /></Route>
      <Route path="/new-recipe" component={NewRecipeForm} />
      <Route path="/sign-up" component={RegisterForm} />
      <Route path="/products/:id" component={ItemDetails} />
      <Route path="/edit/:id" component={EditRecipe} />
      <Route path="/myfavorites" component={MyFovorites} />
      <Route path="/search" component={Search} />
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
