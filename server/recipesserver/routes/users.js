const express = require("express");
const router = express.Router();
const db = require('../models/index');
const validation = require('../middlewares/validate')
const userSchema = require('../validations/registerValidations')
const auth = require('../middlewares/auth')
const User = db.users;
const Favorite = db.favorites;
const bcrypt = require('bcrypt')
const saltRounds = 10;

User.hasMany(Favorite, {
  foreignKey: 'UserId',
})
Favorite.belongsTo(User)

const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll()
    res.send(response)
  } catch (err) {
    console.log(err);

    res.status(404).send(err)
  }
}


const getUser = async (req, res) => {
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
  const { email, password, firstName, lastName, id } = req.body.values
  console.log(email, password, id);
  const response = await User.update(
    { email, password, firstName, email, lastName }, {
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
    await Favorite.create({
      UserId: id,
      DietId: favorite
    })
  }
  res.send('updated')
}

const signUp = async (req, res) => {
  const body = req.body.values
  try {
    const { firstName, lastName, email, password } = body
    const response = await User.create({
      email, password,
      firstName, lastName
    })
    res.send(response.id)

  } catch (err) {
    res.send(err)
  }
}

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      email: email.trim(),
    }
  })
  if (user) {
    if (user.password === password) {
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
  .post(validation(userSchema), signUp)
router.route("/getUser").post(getUser)
router.route('/login').post(login)
router.route('/protected').post(auth, login)
router
  .route("/:userId")
  .delete(deleteUser)
module.exports = router;
