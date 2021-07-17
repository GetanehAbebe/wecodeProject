import React from "react";
import Product from "./product";

export default function Main(props) {
 
  const { products, onAdd } = props;
  console.log('products',products)
  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        {products.length>0&&products.map((product) => (
          <Product key={product.recipeId} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </main>
  );
}
