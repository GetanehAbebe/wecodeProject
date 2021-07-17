import React, { useState, useEffect } from "react";
import demoData from "./demoData";
import CardItem from "./CardItem";
import { Form, Col, Row, FormControl } from "react-bootstrap";
import MyVerticallyCenteredModal from "../utills/Modal";
import { getData } from '../DAL/api'
import Pagination from "../utills/Pagination";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import App from "../Pages/Gallery";
import Cards from "./Cards";
import classes from './SearchRecipes.module.css'
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
    <div>
      <Row className="container-fluid m-auto search-bar-dropdown">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Row>
      <div className={classes.results} >
        <ul className='search-bar-dropdown w-75 m-auto'>
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

        </ul>
      </div>
    </div >
  );
}

export default SearchRecipes;
