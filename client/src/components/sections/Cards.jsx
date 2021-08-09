import React from "react";
import "./Cards.css";
import { useEffect, useState } from 'react'
import Invitation from "./invitation";
import { mostPopular } from '../DAL/api'
import { Link } from 'react-router-dom'
import axios from "axios";

function Cards() {
  const [firstSection, setFirstSection] = useState([])
  useEffect(async () => {
    const getRecipes = await mostPopular()
    // axios.get('http://127.0.0.1:5000/recipes/popular')
    console.log(getRecipes)
    console.log(getRecipes);
    setFirstSection(getRecipes)
  }, [])
  return (
    <div className="cards" >
      <h1>Feel like a chef</h1>
      <h5>Add, Edit, Share your recipes and Enjoy to discover other's recipes </h5>
      <div className="cards__container mt-5 ">
        {firstSection && <div className='justify-content-center'>
          {firstSection.map((recipe, i) => {
            // console.log(recipe.images[0]?.url);
            return <div className="recipe">
              <li>
                <Link to={`products/${recipe.id || recipe._id}`}>
                  <div className="image">
                    {/* <img src={`http://localhost:3200/${recipe.images}`} /> */}

                    <img src={recipe.images ? `http://localhost:3200/${recipe.images || recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                  </div>
                </Link >
              </li>
              <div >
                <h4>{recipe.name.slice(0, 20)}</h4>
                <ul className="media">
                  <li><i className="fa fa-clock-o m-auto"></i> {recipe.prepTimeMin} <i className="far fa-clock"></i></li>
                  <li><i className="fa fa-eye"></i> {recipe.views}</li>
                  {/* <li>  <i className="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li> */}
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
