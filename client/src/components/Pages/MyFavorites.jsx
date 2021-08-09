import { useState, useEffect } from 'react';
import { userRecipes, getFavorites, deleteFromFavorites } from "../DAL/api";
import { Link, useHistory } from 'react-router-dom'
const Cookies = require('js-cookie')
const MyFovorites = () => {
    const [recipes, setRecipes] = useState([])
    const history = useHistory()

    useEffect(async () => {
        const id = Cookies.get("user")
        if (!id) history.push('/login')
        const favorites = await getFavorites(id)
        console.log(favorites);
        setRecipes(favorites)
    }, [])

    const deleteFavorite = async (userId, recipeId) => {
        const id = Cookies.get("user")
        const response = await deleteFromFavorites(userId, recipeId)
        return response
    }



    return <div className='mt-5'>
        {
            recipes.length ? recipes.map(item => {
                return <div class="recipe">
                    <div class="image">
                        <img src={item.recipe.images[0] ? `http://localhost:3200/${item.recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                        <div class="likes" onClick={() => {
                            deleteFavorite(Cookies.get("user"), item.recipe.id)
                        }}>
                            <i class="fas fa-minus"></i>
                        </div>

                    </div>

                    {/* <div class="media d-flex flex-column">

                    </div> */}
                    <h6>{item.recipe.name.slice(0, 20)}</h6>
                    <ul class="media">
                        <li><i class="fa fa-clock-o"></i> {item.recipe.prepTimeMin} <i class="far fa-clock"></i></li>
                        <li><i class="fa fa-eye"></i> {item.recipe.views}</li>
                        <li>  <i class="far fa-calendar-alt"></i> {(item.recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>
                        <li> <Link to={`products/${item.recipe.id}`}>   <i class="fas fa-info-circle"></i></Link > </li>
                    </ul>

                </div>
            }) : <p>the favorite empty</p>
        }


    </div>
}
export default MyFovorites