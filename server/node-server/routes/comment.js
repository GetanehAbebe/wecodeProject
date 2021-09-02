const express = require("express");
const router = express.Router();
const db = require('../models/index');
const Comment = db.comments

const addComment = async (req, res) => {
    console.log(req.body)
    try {
        const response = await Comment.create({
            comment: req.body.comment,
            userId: req.body.userId,
            recipeId: req.body.recipeId,
            raaing: req.body.rating
        })
        res.send(response)
    } catch (err) {
        console.log(err)
        res.status(404).send('not found')
    }
}

router.route("/").post(addComment)
module.exports = router;