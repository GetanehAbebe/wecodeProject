const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const db = require('../models/index')
const fetchData = require("../../../client/src/components/DAL/api");
const { getRecipeIngredients, insertUser, getDataFromApi } = require('../DAL/api')
/* GET ingredients listing. */
const getIngredients = async () => {
    const ingredients = await fetchData.getIngredients();
    return ingredients;
};
const Ingredient = db.ingredients;

const getAllingredients = async (req, res) => {
    try {
        const response = await Ingredient.findAll()
        // console.log(response);

        res.status(200).json(response)
    } catch (err) {
        res.status(404).send(err)
    }
}
const recipeIngrediens = async (req, res) => {
    try {
        console.log(req.params.recipeId);
        const response = await getRecipeIngredients(req.params.recipeId)
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}


// const getIngredient = async (req, res) => {
//     const ingredients = await getIngredients();
//     const indredient = ingredients.find((item) => item.userId == req.params.userId);
//     res.send(indredient);
// };

const addIngredient = async (req, res) => {
    console.log('ing', req.body);
    res.send(req.body)
    const response = await Ingredient.create({
        name: req.body.name
    })


};


router.route("/").get(getAllingredients).post(addIngredient);
router
    .route("/:recipeId")
    .get(recipeIngrediens)



module.exports = router;
