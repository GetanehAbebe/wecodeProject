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
// const Category = require('../Images/Category')
// const Diet = require('../Images/Diet')
// const Favorite = require('../Images/Favorite')
const Image = require('../Images/Image')
// const Ingredient = require('../Images/Ingredient')
// const Instruction = require('../Images/Instruction')
// const Unit = require('../Images/MeasuringUnit')
// const RecipeCategory = require('../Images/RecipeCategory')
// const RecipeIngredient = require('../Images/RecipeIngredient')
// const RecipeDiet = require('../Images/RecipeDiet')

const getUsers = async () => {
  const users = await fetchData
  return users;
};



// Recipe.hasMany(Image, {
//   foreignKey: 'recipeId'
// })
// Image.belongsTo(Recipe)
// // Recipe.belongsTo(User)
// db.sync().then(result => {
//   return Recipe.create({ name: "getaneh", description: "abebe", views: 0, source: "123getaneh", sourceUrl: "google", isPrivate: false, prepTimeMin: 10 })
//   console.log(result)
// }).then(result => console.log(result)
// )



const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll()
    res.send(response)
  } catch (err) {
    res.status(404).send(err)
  }
}
const getUser = async (req, res) => {
  console.log(req.body);

  const response = await User.findOne({
    where: {
      id: req.body.id
    }
  }
  )
  res.send(response);
};





// const addUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body.values
//   console.log();
//   try {

//     const response = await User.create({ firstName, lastName, email, password })
//     res.send(response.id)
//     bcrypt.hash(password, saltRounds, async (err, hash) => {

//       // insertFavorite(response.id, req.body.values.diet)
//     } catch (err) {
//       res.status(404).send(err)
//     }
// };

const getUserRecipes = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        id: req.body.userId
      },
      include: [
        {
          model: Recipe,
          include: [
            Image
          ]

        },
      ],
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
  const { email, password, id } = req.body
  console.log(email, password, id);
  const response = await User.update(
    { email, password }, {
    where: {
      id: id
    }
  }
  )
  res.send('updated')
}

const addUser = async (req, res) => {
  const body = req.body.values
  try {
    console.log(req.values);
    const { firstName, lastName, email, password } = body
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res.send(err);
      }
      console.log('11');

      const response = await User.create({
        email, password: hash,
        firstName, lastName
      })
      res.send(response.id)
    });
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
    bcrypt.compare(password, user.password, (error, response) => {
      console.log('response--1', response);

      if (response) {
        console.log('seassion', res.cookies);
        res.cookie('session_id', '123456')
        // req.session.user = user;
        // req.session.isAuth = true;

        res.status(200).send(user);
      } else {
        console.log('Wrong username/password combination!');

        res.send({ message: "Wrong email/password combination!" });
      }
    });
  } else {
    res.send({ message: "User doesn't exist" });
  }

}





router.route("/")
  .get(getAllUsers).put(updateUser)
  .post(validation(userSchema), addUser)
router.route("/user").post(userDetails)
router.route('/login').post(userDetails)
router.route('/protected').post(auth, userDetails)
// router.post("/",()=>{validation(userSchema),async(req,res)=>{


// })
router.route('/recipes/:userId').get(getUserRecipes)
// router.route("/").post(addUser);
router
  .route("/:userId")
  .get(getUser)
  // .post(addUser)
  .delete(deleteUser)
  .put(updateUser)

module.exports = router;
