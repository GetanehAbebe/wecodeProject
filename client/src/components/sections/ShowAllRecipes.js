import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import './AllRecipes.css'
import CardItem from "./CardItem";
import { Form, Row, Col } from "react-bootstrap";
import ReactPaginate from 'react-paginate'
import { getData, orderBy } from "../DAL/api";
const ShowAllRecipes = (props) => {
  const { recipes, images, loading, onAdd } = props
  const [orderListBy, setOrderListBy] = useState('asc')
  const [newRecipes, setNewRecipes] = useState([])
  const [listState, setListState] = useState('name')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0)
  const [recipesPerPage, setRecipesPerPage] = useState(5);

  useEffect(() => {
    console.log(recipes.length);

    setNewRecipes(recipes)
  }, [])
  useEffect(() => {
    return order()
  }, [orderListBy, listState, pageNumber, recipesPerPage])
  if (loading) {
    return (
      <h2>
        Loading
        <Spinner animation="border" />
      </h2>
    );
  }
  const order = async () => {
    const value = listState
    const response = await orderBy(value, orderListBy, pageNumber, recipesPerPage)
    console.log(response);
    setNewRecipes(response)
  }

  const changeState = () => {
    if (orderListBy === 'asc') {
      setOrderListBy('desc')

    }
    if (orderListBy === 'desc') {
      setOrderListBy('asc')

    }
  }
  const changeListState = (e) => {
    console.log(e.target.value);
    setListState(e.target.value)
  }
  const indexOfLastPost = currentPage * recipesPerPage;
  const indexOfFirstPost = indexOfLastPost - recipesPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(recipes.length / recipesPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  return (
    <div>

      <div className='d-flex justify-content-center flex-row'>
        <div class="form-check">
          <input onClick={(e) => changeListState(e)} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="name" />
          <label class="form-check-label" for="exampleRadios1">
            name
          </label>
        </div>
        <div class="form-check">
          <input onClick={(e) => changeListState(e)} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="views" />
          <label class="form-check-label" for="exampleRadios1">
            views
          </label>
        </div>
        <div class="form-check">
          <input onClick={(e) => changeListState(e)} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="uploadDate" />
          <label class="form-check-label" for="exampleRadios2">
            Date
          </label>
        </div>
        <h1 vlaue='date' onClick={changeState} className='ml-3'><i class="fas fa-sort"></i></h1>
      </div>
      <select onChange={(e) => setRecipesPerPage(e.target.value)}>
        <option>--recipes per page--  </option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <div className='d-flex flex-wrap justify-content-center'>
        {newRecipes.length > 0 && newRecipes.map((recipe, i) => (
          <Link to={`products/${recipe.id}`}>
            <div class="recipe">
              <div class="image">
                <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                <div class="likes">
                  <i class="fa fa-heart-o lv"></i>
                </div>
                <div class="name">
                  <h3>{recipe.name}</h3>
                </div>
              </div>
              <ul class="media">
                <li><i class="fa fa-clock-o"></i> {recipe.prepTimeMin} Minutes</li>
                <li><i class="fa fa-eye"></i> {recipe.views}</li>
                <li><i class="fa fa-cutlery"></i> 2 People</li>
              </ul>
            </div>
          </Link >
        ))
        }
        <ReactPaginate previousLabel={<i class="fas fa-arrow-left"></i>}
          nextLabel={<i class="fas fa-arrow-right"></i>}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"} />
      </div>

    </div>

  )
}

export default ShowAllRecipes;
