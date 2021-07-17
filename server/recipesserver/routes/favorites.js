const express = require("express");
const router = express.Router();
const db = require('../utill/database');
// const Favorite = require('../models/Favorite')
// const User = require('../models/User')
// const Recipe = require('../Images/Recipe')
// const Category = require('../models/Category')


const getAllFavorites = async (req, res) => {
  try {
    console.log('3');

    const response = await Favorite.findAll({

      include: [
        {
          model: User,
        }
      ],

    })
    // const response = await getDataFromApi('users')
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