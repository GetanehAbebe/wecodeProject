const express = require("express");
const router = express.Router();
const { getDataFromApi } = require('../DAL/api')
const db = require('../models/index');


/* GET ingredients listing. */
const getIngredients = async () => {
    const ingredients = await fetchData.getIngredients();
    return ingredients;
};

const Diet = db.diets


const getAllDiets = async (req, res) => {
    try {
        const response = await Diet.findAll()
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}
router.route("/").get(getAllDiets)


module.exports = router;