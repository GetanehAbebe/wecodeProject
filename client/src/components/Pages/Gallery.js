import React, { useState, useEffect } from "react";
import Posts from "../sections/ShowAllRecipes";
import Pagination from "../utills/Pagination";
import './Gallery.css'
import ShowAllrecipes from "../sections/ShowAllRecipes";
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
    <div className="container=fluid mt-5 m-auto">
      <h3 className="text-primary mb-3">Recipes Gallery</h3>

      {<ShowAllrecipes
        recipes={recipes}
        loading={loading}
      />
      }
      

    </div>
  );
};

export default Gallery;
