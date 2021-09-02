const express = require("express");
const router = express.Router();
const db = require('../models/index');
const Category = db.categories;


const getAllCategories = async (req, res) => {
    try {
        const response = await Category.findAll()
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}


router.route("/").get(getAllCategories)
module.exports = router;