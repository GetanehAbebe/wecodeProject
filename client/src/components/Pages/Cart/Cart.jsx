import { useState, useEffect } from "react";
import { getRecipes } from "../../DAL/api";
const fetchData = require('../../DAL/api')

function Cart({ match }) {
  const [cartList, setCartList] = useState([
    { recipeId: 1 },
    { recipeId: 2 },
    { recipeId: 3 },
  ]);
  useEffect(async () => {
    const recipes = await fetchData.getRecipes();
    console.log(recipes);
    const recipe = recipes.filter((item) => item.recipeId == match.params.id);
    setCartList([...cartList, ...recipe]);
    console.log(recipe);
    console.log(match, cartList);
  }, []);
  return (
    <div className="m-auto text-center">
      <h1>Welcome to Cart</h1>
      <ul>
        {cartList.length > 0 &&
          cartList.map((item) => {
            return <li key={item.recipeId}>{item.name}</li>;
          })}
      </ul>
    </div>
  );
}
export default Cart;
