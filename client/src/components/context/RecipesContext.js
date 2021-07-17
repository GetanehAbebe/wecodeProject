import { createContext, useEffect, useState } from "react";
import { getRecipes } from "../DAL/api";
import { v4 as uuidv4 } from "uuid";
const fetchData = require('../DAL/api')

export const RecipesContext = createContext();

const RecipesContextProvider = (props) => {
  const [recipes, setRecipes] = useState([1, 2, 3, 5]);

  useEffect(async () => {
    const fetchedRecipes = await fetchData.getRecipes();
    setRecipes(fetchedRecipes);
  }, []);

  //   useEffect(() => {
  //     localStorage.setItem("employees", JSON.stringify(employees));
  //   });

  const sortedRecipes = recipes.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addRecipe = (recipe) => {
    setRecipes([
      ...recipes,
      { ...recipe, recipeId: Math.floor(Math.random() * 121) },
    ]);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.recipeId !== id));
  };

  const editRecipe = (updatedRecipe) => {
    let newArray = recipes.map((recipe) =>
      recipe.recipeId === updatedRecipe.recipeId ? updatedRecipe : recipe
    );
    setRecipes(newArray);
  };

  return (
    <RecipesContext.Provider
      value={{
        sortedRecipes,
        addRecipe,
        deleteRecipe,
        editRecipe,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
