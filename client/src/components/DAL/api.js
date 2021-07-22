"use strict";
const fetch = require("node-fetch");
const axios = require('axios')

const getData = async (table, id) => {
  const response = await axios.get(`http://localhost:3200/${table}${!!id ? ('/' + id) : ''}`)
  return response.data
};

const getRecipes = async () => {
  const recipes = await axios.get('http://localhost:3200/recipes')
  return recipes.data
};

const getCategories = async () => {
  const categories = await axios.get('http://localhost:3200/categories')
  return categories.data

};

const getDiets = async () => {
  const diets = await axios.get('http://localhost:3200/diets')
  return diets.data
};

const getUnits = async () => {
  const units = await axios.get('http://localhost:3200/units')
  return units.data
};

const getIngredients = async () => {
  const ingredients = await axios.get('http://localhost:3200/ingredients')
  return ingredients.data
};
const getImages = () => {
  // return Promise.resolve(images);
};
const getUserRecipes = async (userId) => {
  console.log(userId);
  const usersRecipe = await axios.get(`http://localhost:3200/users/recipes/${userId}`)
  return usersRecipe.data

}
const updateRecipe = async (data, recipe) => {
  const response = await axios.post(`http://localhost:3200/recipes/update`, data)
  return response.data
}

const login = async (email, password) => {
  const res = await axios.post('http://localhost:3200/users/login', {
    email: email,
    password: password

  })
  return res.data

};
const insertDataToDB = (placeToInsert, values) => {
  axios.post(`http://localhost:3200/${placeToInsert}`, {
    values
  }).then(() => console.log('success'))
}
const getRecipeIngredients = async (recipeId) => {
  console.log(recipeId);
  const response = await axios.get(`http://localhost:3200/ingredients/${recipeId}`)
  return response.data
}

const getRecipeDetails = async (id) => {
  console.log('recipe', id);
  const response = await axios.post(`http://localhost:3200/recipes/getRecipe`, { id })
  return response.data
}
const getImage = async (recipeId) => {
  console.log('recipe', recipeId);
  const response = await axios.get(`http://localhost:3200/images/${recipeId}`)
  return response.data
}


const orderBy = async (type, asc = 'asc', pageNumber, size = 20) => {
  const response = await axios.get(`http://localhost:3200/recipes/?orderBy=${type}&&order=${asc}&&limit=${pageNumber}&&size=${size}`)
  return response.data
}

const sendPutReq = (email, password, id) => {
  axios.put(`http://localhost:3200/users`, { email, password, id })
}

const getSpecificUser = async (id) => {
  console.log(id);

  const response = await axios.post(`http://localhost:3200/users/getUser`, { id })
  return response.data
}
const ingredientsOfRecipe = async (id) => {
  const response = await axios.post(`http://localhost:3200/recipes/ingredient`, { id })
  return response.data
}
const diet = async (id) => {
  const response = await axios.post(`http://localhost:3200/recipes/diet`, { id })
  return response.data
}
const category = async (id) => {
  const response = await axios.post(`http://localhost:3200/recipes/category`, { id })
  return response.data
}
const incrementView = async (id) => {
  const response = await axios.post(`http://localhost:3200/recipes/increment`, { id })
  return response.data
}

const uploadRecipe = async (data, recipe) => {
  const response = await axios.post(`http://localhost:3200/recipes/upload`, data)
  return response.data
}
const mostPopular = async () => {
  const response = await axios.post(`http://localhost:3200/recipes/popular`)
  return response.data
}

const userRecipes = async (id) => {
  const response = await axios.post(`http://localhost:3200/recipes/myrecipes`, { id })
  return response.data
}
const appentIngredient = async (name) => {
  const response = await axios.post(`http://localhost:3200/ingredients`, { name })
  return response.data
}
const appendUser = async (values) => {
  const response = await axios.post(`http://localhost:3200/users`, { values })
  return response.data
}
const updateUser = async (values) => {
  const response = await axios.put(`http://localhost:3200/users`, { values })
  return response.data
}
const destroyRecipe = async (userId, recipeId) => {
  const response = await axios.post(`http://localhost:3200/recipes/delete`, { userId, recipeId })
  return response.data
}
const addfavorites = async (userId, recipeId) => {
  const response = await axios.post(`http://localhost:3200/likes`, { userId, recipeId })
  return response.data
}
const getFavorites = async (id) => {
  const response = await axios.get(`http://localhost:3200/likes/${id}`)
  return response.data

}
const deleteFromFavorites = async (userId, recipeId) => {
  console.log(userId, recipeId);

  const response = await axios.post(`http://localhost:3200/likes/delete`, { userId, recipeId })
  return response.data

}
module.exports = {
  getImages,
  getRecipes,
  login,
  getIngredients,
  getUnits,
  getDiets,
  getCategories,
  getData,
  insertDataToDB,
  getRecipeIngredients,
  getRecipeDetails,
  getImage,
  getUserRecipes,
  orderBy,
  getSpecificUser,
  sendPutReq,
  ingredientsOfRecipe,
  category,
  diet,
  incrementView,
  mostPopular,
  uploadRecipe,
  userRecipes,
  updateRecipe,
  appentIngredient,
  appendUser, updateUser, destroyRecipe,
  addfavorites,
  getFavorites,
  deleteFromFavorites
};
