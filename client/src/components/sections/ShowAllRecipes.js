import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import './AllRecipes.css'
import CardItem from "./CardItem";
import { Form, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import ReactPaginate from 'react-paginate'
import { getData, orderBy, addfavorites } from "../DAL/api";
const Cookies = require("js-cookie");
const ShowAllRecipes = (props) => {
  const { recipes, images, loading, onAdd } = props
  const [orderListBy, setOrderListBy] = useState('asc')
  const [newRecipes, setNewRecipes] = useState([])
  const [listState, setListState] = useState('name')
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0)
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('name');

  const radios = [
    { name: 'Name', value: 'name' },
    { name: 'Date', value: 'uploadDate' },
    { name: 'Views', value: 'views' },
  ];
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
  const addToLikes = async (userId, recipeId) => {
    const response = await addfavorites(userId, recipeId)
  }
  return (
    <div>

      <div className='d-flex justify-content-center recipes-header'>
        <p>filter by:</p>


        <ButtonGroup>

          {radios.map((radio, idx) => (
            <div>
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={'outline-dark '}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  setRadioValue(e.target.value)
                  setChecked(e.currentTarget.checked)
                  changeListState(e)
                }}
              >
                {radio.name}
              </ToggleButton>
            </div>
          ))}
        </ButtonGroup>

        <h1 vlaue='date' onClick={changeState} className='ml-3'>{orderListBy === 'asc' ? <i class="fas fa-sort-amount-up-alt"></i> : <i class="fas fa-sort-amount-down-alt"></i>}</h1>
        <select onChange={(e) => setRecipesPerPage(e.target.value)}>
          <option>recipes per page</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className='d-flex flex-wrap justify-content-around container text-dark'>
        {newRecipes.length > 0 && newRecipes.map((recipe, i) => (
          <div class="recipe">

            <li> <Link to={`products/${recipe.id}`}>
              <div class="image">
                <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />

              </div>
            </Link > </li>
            <div className='justify-content-between'>
              <p>{recipe.name.slice(0, 20)}</p>
              <ul class="media">
                {Cookies.get("user") && <li onClick={() => addToLikes(Cookies.get("user"), recipe.id)}><i className='fa fa-heart'></i> </li>}
                <li><i class="fa fa-clock-o m-auto"></i> {recipe.prepTimeMin} <i class="far fa-clock"></i></li>
                <li><i class="fa fa-eye"></i> {recipe.views}</li>
                <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>

              </ul>
            </div>
          </div>
          // <div class="recipe">

          //     <li> <Link to={`products/${recipe.id}`}> 
          //     <div class="image">
          //       <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />

          //     </div>
          //   </Link > </li>
          //     <div className='justify-content-between'>
          //       <p>{recipe.name.slice(0,20)}</p>
          //       <ul class="media">
          //         <li><i class="fa fa-clock-o m-auto"></i> {recipe.prepTimeMin} <i class="far fa-clock"></i></li>
          //         <li><i class="fa fa-eye"></i> {recipe.views}</li>
          //         <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>

          //       </ul>
          //     </div>
          //   </div>

          // <div class="recipe">
          //   <div class="image">
          //     <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
          //     <div class="likes text-danger" onClick={(e) => {
          //       addToLikes(Cookies.get("user"), recipe.id)
          //     }}>
          //       {Cookies.get("user") && <i class="fas fa-heart"></i>}
          //     </div>
          //     <div class="name">
          //       <h6>{recipe.name}</h6>
          //     </div>
          //   </div>

          //   <ul class="media">
          //     <li><i class="fa fa-clock-o"></i> {recipe.prepTimeMin} <i class="far fa-clock"></i></li>
          //     <li><i class="fa fa-eye"></i> {recipe.views}</li>
          //     <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>
          //     <li> <Link to={`products/${recipe.id}`}>   <i class="fas fa-info-circle"></i></Link > </li>
          //   </ul>
          // </div>

        ))
        }

      </div>
      <ReactPaginate previousLabel={<i class="fas fa-arrow-left"></i>}
        nextLabel={<i class="fas fa-arrow-right"></i>}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"} />
    </div >

  )
}

export default ShowAllRecipes;
