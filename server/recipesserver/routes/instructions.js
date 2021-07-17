const express = require("express");
const router = express.Router();
const { getDataFromApi, getInstructions } = require('../DAL/api')


const getAllInstructions = async (req, res) => {
    try {
        const response = await getDataFromApi('instructions')
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }

}
const getRecipeInstructions = async (req, res) => {
    try {
        const response = await getInstructions(req.params.recipeId)
        res.status(200).json(response)
    } catch (err) {
        res.status(404).send('not found')
    }
};
router.route("/").get(getAllInstructions)
router.route('/:recipeId').get(getRecipeInstructions)


module.exports = router;