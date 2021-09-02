const express = require("express");
const router = express.Router();
const db = require('../models/index');
const Like = db.likes;
const Recipe = db.recipes
const Image = db.images

Recipe.hasMany(Like, {
    foreignKey: 'recipeId',
})
Like.belongsTo(Recipe)
const getLikedRecipes = async (req, res) => {
    const userId = req.params.userId
    try {
        const response = await Like.findAll({
            where: {
                userId,
            },
            attributes: ["recipeId"],
            include: [{
                model: Recipe, include: [{
                    model: Image
                }]
            }],

        }
        )
        console.log(response);

        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}

const addToLikes = async (req, res) => {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;
    console.log(req.body);

    const insertToLiks = await Like.create({
        userId,
        recipeId
    })
    res.send(insertToLiks)
}
const removeFromLikes = async (req, res) => {
    try {
        const recipeId = req.body.recipeId;
        const userId = req.body.userId
        const insertToLiks = await Like.destroy({
            where: {
                userId,
                recipeId
            }
        })
        res.send('removed')
    } catch (err) {
        res.send(err)
    }
}


router.route("/:userId").get(getLikedRecipes)
router.route('/').post(addToLikes)
router.route('/delete').post(removeFromLikes)

module.exports = router;