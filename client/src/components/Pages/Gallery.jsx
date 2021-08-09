import React, { useState, useEffect } from "react";
import './Gallery.css'
import ShowAllrecipes from "../sections/AllRecipes";
import { getData } from "../DAL/api";


const Gallery = ({ onAdd }) => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);

  useEffect(async () => {
    const fetchRecipe = await getData('recipes')
    console.log(fetchRecipe);
    setRecipes(fetchRecipe);

  }, []);


  return (
    <div className="container=fluid mt-5 m-auto gallery">
      <p className="mt-5">Enjoy discovering new recipes </p>
      {<ShowAllrecipes
        recipes={recipes}
        loading={loading}
      />
      }


    </div>
  );
};

export default Gallery;
