const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const db = require('../db')


const { getDataFromApi } = require('../DAL/api')
/* GET ingredients listing. */



const getRecipeIngredietns = async (req, res) => {
    try {
        const response = await getDataFromApi('recipe_ingredients')
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}



router.route("/").get(getRecipeIngredietns)


module.exports = router;