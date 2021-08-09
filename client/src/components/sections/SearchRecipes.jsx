import React, { useState, useEffect } from "react";
import { Row, FormControl } from "react-bootstrap";
import { getData } from '../DAL/api'
import './SearchRecipes.css'
const fetchData = require('../DAL/api')
function SearchRecipes(props) {
  console.log('search recipes-->', props);
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("color");
  const [categories, setCategories] = useState([]);
  const [selecteduser, setSelectedRecipe] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  function changeRecipe(recipe) {
    setSelectedRecipe(recipe);
    // setModalShow(true);
  }
  function getObj(array, filter) {
    return array.find((item) => item.recipeId === filter);
  }
  const handleChange = (value) => {
    setSearchText(value);
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(async () => {
    const fetchedImages = await getData('images');
    const fetchedRecipes = await getData('recipes');
    const fetchCategories = await getData('categories');
    setData(fetchedRecipes);
    setImages(fetchedImages);
    setCategories(fetchCategories);
  }, []);

  useEffect(() => { }, [order, searchText]);

  return (
    <div className='w-100'>

      <Row >
        <FormControl
          type="search"
          placeholder="Search"
          className='w-100'
          aria-label="Search"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Row>

      <div className='search-bar-dropdown w-100'>
        <div className='results w-100 m-0' >
          {searchText &&
            data
              .sort((a, b) => (a[order] < b[order] ? -1 : 0))
              .filter((item) => {
                return item.name.includes(searchText);
              })
              .map((recipe, i) => {
                return (
                  <li
                    onClick={() =>
                      changeRecipe({
                        ...recipe,
                        src: getObj(images, recipe.recipeId)
                          ? getObj(images, recipe.recipeId).imgUr
                          : null,
                      })
                    }
                  >
                    <a href={`/products/${recipe.id}`}>
                      <li onClick={() => { setSearchText('') }}>{recipe.name}</li>
                    </a>
                  </li>
                );
              })}

        </div>
      </div>
    </div >
  );
}

export default SearchRecipes;
