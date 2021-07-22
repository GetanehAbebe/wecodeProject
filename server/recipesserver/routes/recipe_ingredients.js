const express = require("express");
const router = express.Router();
const db = require('../models/index')
const RecipeIngredient = db.recipeingredients

const getRecipeIngredietns = async (req, res) => {
    try {
        const response = await RecipeIngredient.findAll()
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}

router.route("/").get(getRecipeIngredietns)
module.exports = router;