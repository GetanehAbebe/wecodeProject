const express = require("express");
const router = express.Router();
const db = require('../models/index')
const Favorite = db.favorites
const User = db.users
const getAllFavorites = async (req, res) => {
  try {
    const response = await Favorite.findAll({
      include: [
        {
          model: User,
        }
      ],
    })
    res.send(response)
  } catch (err) {
    res.status(404).send('not found')
  }
}


const deleteFavorite = async (req, res) => {
  try {
    const response = await User.destroy({
      where: {
        dietId: req.params.id
      }
    })
    res.send('deleted')

  } catch (err) {
    res.status(404).send(err)
  }
};

router.route("/").get(getAllFavorites)
router.route("/:id").delete(deleteFavorite)

module.exports = router;