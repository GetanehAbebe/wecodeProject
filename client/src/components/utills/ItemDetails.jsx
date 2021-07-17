import { useEffect, useState } from "react";
import { Modal, ListGroupItem, Button, Image } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Details from './Details'
import "./Carousel.css";
import "./ItemDetails.css";
import { getRecipeIngredients, getData, getRecipeDetails, incrementView } from "../DAL/api";
const fetchData = require('../DAL/api')
const Cookies = require('js-cookie')
function ItemDetails(props) {
  const { match } = props
  const [item, setItem] = useState([]);
  const [userId, setUserId] = useState(null)
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  useEffect(async () => {
    console.log('match', match.params.id);
    const recipeItem = await getRecipeDetails(match.params.id)
    console.log(recipeItem);
    setItem(recipeItem);
    setInstructions(recipeItem.instructions)
    setIngredients(recipeItem.recipeingredients)
    if (Cookies.get('user')) {
      const id = Cookies.get('user')
      setUserId(id)
      console.log('id', id);
      setUserId(id)
    }
    const incView = await incrementView(match.params.id)

  }, []);

  return (
    <>

      {item.recipe && <div className='text-center'>
        <div className="row mx-2">
          <div className="col-sm-7">
            <h1>{item.recipe.name}</h1>
            <figure>
              <img src={`http://localhost:3200/${item.images[0]?.url}`} alt="1" />            <figcaption>Shania Pinnata</figcaption>
            </figure>
          </div>
          <div className='col-sm-4'>
            <p>{item.recipe.description}</p>
            <ul>
              <li>🍽 Serves: 4</li>
              <li>⏱ {item.recipe.prepTimeMin}</li>
              <li>👨‍🍳 Cook Time: 25 minutes</li>
              <li>🍝 Total Time: 30 minutes</li>
            </ul>
          </div>
        </div>
      </div>

      }
      <div className='row'>
        <div className="col-sm-5 mx-2">
          <div>
            <h2>The Ingredients</h2>
            <ul className="ingredients">
              {item.ingredients && item.ingredients.map((ingredient, i) => {
                return <li key={i}><span>{ingredient.quantity} {ingredient.measureUnit} {ingredient.name}  </span></li>
              })
              }
            </ul>
          </div>
        </div>
        < div className="col-sm-5">
          <h2>The Process</h2>
          <p className="tip">Click each stage to strikethrough when complete</p>
          <ol className="instructions">

            {item.instructions && item.instructions.map((instruct, i) => {
              return <li key={i}><span>{instruct.instruction}</span></li>
            })
            }
          </ol>
          <p className="last">😋 Buon Appetito!</p>
        </div>
        {item.recipe&&(item.recipe.userId == userId) && <Link className="btn btn-primary" to={`/edit/${match.params.id}`}>
          Edit
        </Link>}
      </div>
    </>
  );
}

//   {item.images && <div className="form-inner product">
//     <h2 class="recipe-title">{item.recipe.name}</h2>
//     <div className='d-felx flex-row'>
//       <p >{item.recipe.description}</p>
//       <p >cook time:{item.recipe.prepTimeMin} minutes</p>
//     </div>
//     <Carousel fade>
//       {item.images.length ?
//         item.images.map((image, i) => (
//           <Carousel.Item key={i} className='meal-img'>
//             <img src={`http://localhost:3200/${image.url}`} alt="1" />
//             <Carousel.Caption>
//               <h3 className="text-center">{item.name}</h3>
//               <p>{item.description}</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         )) : <img src='https://images.pexels.com/photos/4271927/pexels-photo-4271927.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' width='100%' height='60%' />
//       }

//     </Carousel>

//     <div>
//       <h2 class="recipe-title">{item.recipe.name}</h2>
//       <p class="recipe-category">prep time: {item.recipe.prepTimeMin} minutes</p>
//       <p class="recipe-category">views: {item.recipe.views} </p>
//     </div>
//     <div class="recipe-instruct">
//       <h3>Instructions:</h3>
//       {item.instructions.map((inst, i) => {
//         return <p key={i}>{inst.instruction}</p>
//       })}
//     </div>
//     <div class="recipe-instruct">
//       <h3>ingredints:</h3>
//       {item.ingredients && item.ingredients.map((inst, i) => {
//         return <p key={i}>{inst.quantity}  {inst.unit}  {inst.name}</p>
//       })}
//     </div>
//     <div class="recipe-category">
//       <h3>Categories:</h3>
//       {item.category && item.category.map((inst, i) => {
//         return <p key={i}>{inst.name}</p>
//       })}
//     </div>
//     <div class="recipe-instruct">
//       <h3>Diets:</h3>
//       {item.diet && item.diet.map((inst, i) => {
//         return <p key={i}>{inst.name}</p>
//       })}
//     </div>


//     <div>
//       <Link className="btn btn-primary m-2" to='/products'>
//         Go back
//       </Link>
//      
//     </div>
//   </div >}
// </>





export default ItemDetails;
