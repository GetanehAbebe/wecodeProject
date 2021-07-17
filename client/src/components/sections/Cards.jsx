import React from "react";
import "./Cards.css";
import { useEffect, useState } from 'react'
import CardItem from "./CardItem";
import Invitation from "./invitation";
import SearchRecipes from "./SearchRecipes";
import { mostPopular } from '../DAL/api'

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
    setFirstSection(getRecipes.slice(0, 3))
    setSecondSection(getRecipes.slice(3, 6))
  }, [])

  return (
    <div className="cards" >
      <SearchRecipes />
      <div className="cards__container">
        {firstSection && <div className="cards__wrapper">
          <ul className="cards__items">
            {firstSection.map((recipe, i) => {
              console.log(recipe.images[0]?.url);
              return <CardItem
                src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url}` : images[i + 3]}
                views={recipe.views}
                text={recipe.name || `${categories[i]} recipes with delicate and precise spices`}
                label={recipe.categories.length ? recipe.categories.name : categories[i]}
                path={`/products/${recipe.id}`}
              />
            })}
          </ul>
          <ul className="cards__items">
            {secondSection.map((recipe, i) => {
              console.log(recipe.images);
              return <CardItem
                src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url}` : images[i]}
                text={recipe.name || `${categories[i]} recipes with delicate and precise spices`}
                label={recipe.categories.length ? recipe.categories[0].name : categories[i]}
                views={recipe.views}
                path={`/products/${recipe.id}`}
              />
            })}
          </ul>
          <Invitation />
        </div>
        }
      </div>
    </div>
  );
}

export default Cards;
