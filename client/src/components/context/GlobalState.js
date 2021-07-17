import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { getRecipes, getUsers } from "../DAL/api";
import { useEffect } from "react";
const fetchData = require('../DAL/api')
// Initial State
const initialState = {
  recipes: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(async () => {
    const recipes = await fetchData.getRecipes();
    const users = await fetchData.getUsers();
    initialState.recipes = recipes;
    initialState.users = users;
    console.log("initialstate", initialState);
  }, []);

  // Actions
  const removeRecipe = (id) => {
    dispatch({
      type: "REMOVE_RECIPE",
      payload: id,
    });
  };

  const editRecipe = (id) => {
    dispatch({
      type: "EDIT_RECIPE",
      payload: id,
    });
  };
  const addRecipe = (recipe) => {
    dispatch({
      type: "EDIT_RECIPE",
      payload: recipe,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  const editUser = (user) => {
    dispatch({
      type: "EDIT_USER",
      payload: user,
    });
  };
  const removeUser = (id) => {
    dispatch({
      type: "EDIT_USER",
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        removeUser,
        addUser,
        editUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
