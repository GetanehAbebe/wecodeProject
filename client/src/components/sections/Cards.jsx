import React from "react";
import "./Cards.css";
import { useEffect, useState } from 'react'
import CardItem from "./CardItem";
import Invitation from "./invitation";
import SearchRecipes from "./SearchRecipes";
import { mostPopular } from '../DAL/api'
import { Link } from 'react-router-dom'

function Cards() {

  const [firstSection, setFirstSection] = useState([])
  const [secondSection, setSecondSection] = useState([])
  const categories = ["Meat", "Salads", "Specials"]
  const images = ["https://images.pexels.com/photos/3758132/pexels-photo-3758132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/7613432/pexels-photo-7613432.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://media.istockphoto.com/photos/traditional-ethiopian-dish-picture-id452732099?s=612x612",
    "https://images.pexels.com/photos/372882/pexels-photo-372882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/372882/pexels-photo-372882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  ]


  useEffect(async () => {
    const getRecipes = await mostPopular()
    console.log(getRecipes);
    setFirstSection(getRecipes)
    setSecondSection(getRecipes.slice(3, 6))
  }, [])

  return (
    <div className="cards" >
      <h1>Feel like a chef</h1>
      <p>Add, Edit, Share your recipes and Enjoy to discover other's recipes </p>
      <div className="cards__container mt-5 ">
        {firstSection && <div className='justify-content-between'>

          {firstSection.map((recipe, i) => {
            console.log(recipe.images[0]?.url);
            return <div class="recipe">

              <li> <Link to={`products/${recipe.id}`}>
                <div class="image">
                  <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />

                </div>
              </Link > </li>
              <div className='justify-content-between'>
                <p>{recipe.name.slice(0, 20)}</p>
                <ul class="media">
                  <li><i class="fa fa-clock-o m-auto"></i> {recipe.prepTimeMin} <i class="far fa-clock"></i></li>
                  <li><i class="fa fa-eye"></i> {recipe.views}</li>
                  <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>

                </ul>
              </div>
            </div>

          })}



          <Invitation />
        </div>
        }
      </div>
    </div>
  );
}

export default Cards;
