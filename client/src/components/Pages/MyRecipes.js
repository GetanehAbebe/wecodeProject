import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Gallery from './Gallery'
import { userRecipes } from "../DAL/api";
import Cookies from 'js-cookie'

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(async () => {
        const id = Cookies.get('user')
        const response = await userRecipes(id)
        console.log('id', id, 'recipes', response);
        setRecipes([...response])
    }, [])

    console.log(recipes);

    return <>
        {recipes.length && < div className='d-flex flex-wrap justify-content-center' >
            {recipes.map((recipe, i) => (
                <Link to={`products/${recipe.id}`}>
                    <div class="recipe">
                        <div class="image">
                            <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} `
                                : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
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
        </div >
        }
    </>
}
export default MyRecipes;