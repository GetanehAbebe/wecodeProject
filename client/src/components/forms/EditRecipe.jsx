import React, { useState, useContext, useEffect } from "react";

import { RecipesContext } from "../context/RecipesContext";

import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Button } from "react-bootstrap";
import { getRecipes } from "../DAL/api";
import NewRecipeForm from "./NewRecipeForm";

function EditRecipe(props) {
  const { match } = props
  const { edituser } = useContext(GlobalContext);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [recipeId, setRecipeId] = useState(0);

  const history = useHistory();
  useEffect(() => {
    const par = match.params.id;
    setRecipeId(par)
    console.log('par', par);
  }, []);
  
  return (
    <>
      {recipeId && <NewRecipeForm mode={true} recipeId={recipeId} />}
    </>
  );

}

export default EditRecipe;
