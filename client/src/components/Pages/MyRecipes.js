import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import Gallery from './Gallery'
import { userRecipes, destroyRecipe } from "../DAL/api";
import Cookies from 'js-cookie'

const MyRecipes = () => {

    const history = useHistory()
    const [recipes, setRecipes] = useState([])
    useEffect(async () => {
        const id = Cookies.get('user')
        if (!id) history.push('/login')
        const response = await userRecipes(id)
        console.log('id', id, 'recipes', response);
        setRecipes([...response])
    }, [])

    const delteRecipe = async (userId, recipeId) => {
        const response = await destroyRecipe(userId, recipeId)
        history.push('/myrecipes')
        alert(response)
    }
    return <div className='myrecipes'>
        <h1 className='header mt-5'>My Recipes</h1>
        {recipes.length ? < div className='d-flex flex-wrap justify-content-center' >
            {recipes.map((recipe, i) => (
                <div class="recipe">

                    <li> <Link to={`products/${recipe.id}`}>
                        <div class="image">
                            <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />

                        </div>
                    </Link > </li>
                    <div className='justify-content-around'>
                        <p>{recipe.name.slice(0, 20)}</p>
                        <ul class="media">
                            {/* {Cookies.get("user") && <li onClick={() => addToLikes(Cookies.get("user"), recipe.id)}><i className='fa fa-heart'></i> </li>} */}
                            <li onClick={() => delteRecipe(Cookies.get("user"), recipe.id)}> <i class="fas fa-trash"></i></li>
                            <li><i class="fa fa-eye"></i> {recipe.views}</li>
                            <li><Link to={`edit/${recipe.id}`}><i class="far fa-edit"></i></Link > </li>

                        </ul>
                    </div>
                </div>
                // <div class="recipe">
                //     <div class="image">
                //         <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} `
                //             : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                //         {/* <div class="likes">
                //             <i class="fa fa-heart-o lv"></i>
                //         </div> */}
                //         <div className='mb-2'>
                //             <p>{recipe.name}</p>
                //         </div>
                //     </div>

                //     <ul class="media">

                //         <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>
                //         <li> <Link to={`products/${recipe.id}`}>   <i class="fas fa-info-circle"></i></Link > </li>
                //         <li onClick={() => delteRecipe(Cookies.get("user"), recipe.id)}> <i class="fas fa-trash"></i></li>
                //         <li><Link to={`edit/${recipe.id}`}><i class="far fa-edit"></i></Link > </li>
                //     </ul>
                // </div>


            ))
            }
        </div > : <p>you have no recipes</p>
        }
    </div>
}
export default MyRecipes;