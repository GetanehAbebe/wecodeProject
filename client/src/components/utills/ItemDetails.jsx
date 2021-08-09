import { useEffect, useState } from "react";
import { Modal, ListGroupItem, Button, Image } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carousel.css";
import "./ItemDetails.css";
import { getRecipeDetails, incrementView } from "../DAL/api";
const fetchData = require('../DAL/api')
const Cookies = require('js-cookie')
function ItemDetails(props) {
  const { match } = props
  const [item, setItem] = useState('');
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

      {!!item && <div className='text-center mt-5 product'>
        <div className="row mx-2 mt-3" >
          <div className="col-sm-12 col-md-6">
            <h1 className='text-justify mt-2'>{item.name || item.recipe.name}</h1>
            <figure>
              {/* <img src={require(`./public/uploads/WeCode-Rotterdam-vresized-ready.jpg`)} /> */}
              <img src={`http://localhost:3200/${item.images}`} />
              {/* <figcaption>{item.recipe.name}'s image</figcaption> */}
            </figure>
          </div>
          <div className='col-sm-12 mt-5 text-left col-md-5'>
            <p className='text-left'>{item.description || item.recipe.description}</p>

            <p className='text-left'>Categories:</p>
            <ul className='d-flex text-left'>
              {item.categories?.map(category => {
                return <li className='mx-2'>{category.name}  </li>
              })}
            </ul>
            <p className='text-left'>Diets:</p>
            <ul className='d-flex'>
              {item.diets?.map(category => {
                return <li className='mx-2'>{category.name}  </li>
              })}
            </ul>
            <ul className='text-left'>
              <li className='text-left'>⏱ preparation time: {item.prepTimeMin || item.recipe.prepTimeMin} minutes</li>
            </ul>
            {/* <ul className='text-left'>
              <li className='text-left'><i class="fas fa-calendar-alt"></i> Upload date: {(item.recipe.createdAt).slice(0, 10).split(' ').reverse().join(' ')}</li>
            </ul> */}

          </div>
        </div>


        <div className='row '>
          <div className="col-sm-5 mx-2 ">
            <div>
              <h2 data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Ingredients <i className="fas fa-angle-down"></i></h2>
              <ul className="instructions text-left collapse pl-5" id='collapseExample'>
                {item.ingredients && item.ingredients.map((ingredient, i) => {
                  return <li key={i}><span>{ingredient.quantity} {ingredient.id || ingredient.measureUnit} {ingredient.ingredient}  </span></li>
                })
                }
              </ul>
            </div>
          </div>
          < div className="col-sm-5">
            <h2 data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">Method <i className="fas fa-angle-down"></i></h2>
            <ol className="instructions collapse pl-5" id='collapseExample2'>
              {item.instructions && item.instructions.map((instruct, i) => {
                return <li key={i}><span>{i + 1} - {instruct.instruction}</span></li>
              })
              }
              {/* {item.recipe && (item.recipe.createdAt).slice(0, 10)} */}
              <p className="last">😋 Buon Appetito!</p>
            </ol>

          </div>

        </div>
      </div>

      }
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
