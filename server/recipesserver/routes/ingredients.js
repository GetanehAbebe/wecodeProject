const express = require("express");
const router = express.Router();
const db = require('../models/index')
const Ingredient = db.ingredients;
const RecipeIngredient = db.recipeingrediens;

const getAllingredients = async (req, res) => {
    try {
        const response = await Ingredient.findAll()
        res.status(200).json(response)
    } catch (err) {
        res.status(404).send(err)
    }
}

const recipeIngrediens = async (req, res) => {
    try {
        const response = await RecipeIngredient.findAll({
            where: {
                recipeId: req.params.recipeId
            }
        })
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}

const addIngredient = async (req, res) => {
    try {
        const response = await Ingredient.create({
            name: req.body.name
        })
        res.send(req.body)
    } catch (err) {
        res.send(err)
    }
};

router.route("/").get(getAllingredients).post(addIngredient);
router
    .route("/:recipeId")
    .get(recipeIngrediens)



module.exports = router;
