const express = require("express");
const router = express.Router();
const db = require('../models/index');
const Instruction = db.instructions;

const getAllInstructions = async (req, res) => {
    try {
        const response = await Instruction.findAll()
        res.send(response)
    } catch (err) {
        res.status(404).send(err)
    }

}
const getRecipeInstructions = async (req, res) => {
    try {
        const response = await Instruction.findAll({
            where: {
                recipeId: req.params.recipeId
            }
        })
        res.status(200).json(response)
    } catch (err) {
        res.status(404).send('not found')
    }
};

router.route("/").get(getAllInstructions)
router.route('/:recipeId').get(getRecipeInstructions)


module.exports = router;