const express = require("express");
const router = express.Router();
const db = require('../models/index');
const validation = require('../middlewares/validate')
const userSchema = require('../validations/registerValidations')
const { recipeByUser, insertFavorite, insertUser, getDataFromApi } = require('../DAL/api')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const saltRounds = 10;
// const User = require('../models/User')
// const Recipe = require('../.models/Recipe')
const User = db.users;
const Recipe = db.recipes;
const Diet = db.diets;
const Favorite = db.favorites;
const Like = db.likes;
// User.belongsToMany(Diet, {
//   through: Favorite,
//   foreignKey: 'dietId',
//   otherKey: 'dietId'
// })
User.hasMany(Favorite, {
  foreignKey: 'UserId',
})
Favorite.belongsTo(User)

// User.hasMany(Like, {
//   foreignKey: 'userId',
// })
// Like.belongsTo(User)
// Diet.hasMany(Favorite, {
//   foreignKey: 'DietId',
// })
// Diet.belongsTo(Favorite)
// // const Category = require('../Images/Category')
// const Diet = require('../Images/Diet')
// const Favorite = require('../Images/Favorite')
const Image = require('../Images/Image')

const getAllUsers = async (req, res) => {
  try {
    const response = await Like.findAll(
    )
    console.log(response);

    res.send(response)
  } catch (err) {
    console.log(err);

    res.status(404).send(err)
  }
}


const getUser = async (req, res) => {
  console.log(req.body, 'cookies', req.cookies);

  const id = req.body.id
  try {
    const response = await User.findOne({
      where: {
        id: id
      },
      include: [{ model: Favorite }]
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(404).send(err)
  }
};

const deleteUser = async (req, res) => {
  const response = await User.destroy({
    where: {
      id: req.params.userId
    }
  })
  res.send('deleted')
}

const updateUser = async (req, res) => {
  console.log(req.body);

  const { email, password, name, id } = req.body.values
  console.log(email, password, id);
  const response = await User.update(
    { email, password, name, email, password }, {
    where: {
      id: id
    }
  }
  )
  const favoriteresponse = await Favorite.destroy({
    where: {
      UserId: id
    }
  })


  for (let favorite of req.body.values.diet) {
    console.log(favorite);
    Favorite.create({
      UserId: id,
      DietId: favorite
    })
  }
  res.send(response)
}

const addUser = async (req, res) => {
  const body = req.body.values
  try {
    console.log(req.values);
    const { firstName, lastName, email, password } = body
    const response = await User.create({
      email, password,
      firstName, lastName
    })
    res.send(response.id)

  } catch (err) {
    console.log(err);
    res.send(err)
  }
}

const userDetails = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      email: email.trim(),
    }
  })
  console.log('user2', user);

  if (user) {
    console.log('response--1', user);

    if (user.password === password) {
      console.log('seassion', res.cookies);
      res.cookie('userId', '123321')


      res.status(200).send(user);
    } else {
      console.log('Wrong username/password combination!');

      res.send({ message: "Wrong email/password combination!" });
    }

  } else {
    res.send({ message: "User doesn't exist" });
  }

}





router.route("/")
  .get(getAllUsers).put(updateUser)
  .post(validation(userSchema), addUser)
router.route("/user").post(userDetails)
router.route("/getUser").post(getUser)
router.route('/login').post(userDetails)
router.route('/protected').post(auth, userDetails)
// router.post("/",()=>{validation(userSchema),async(req,res)=>{




// router.route("/").post(addUser);
router
  .route("/:userId")

  // .post(addUser)
  .delete(deleteUser)


module.exports = router;
