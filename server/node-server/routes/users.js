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
const nodemailer = require('nodemailer')
const { sendConfimatioEmail } = require('./mailer')
const verifyJWT = require('../middlewares/verifyJWT')

const jwt = require('jsonwebtoken')
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
      attributes: { exclude: ['password'] },
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
  const { email, password, firstName, lastName, id } = req.body
  console.log(email, password, id);
  const response = await User.update(
    { email, password, firstName, email, lastName }, {
    where: {
      id: id
    }
  }
  )

  // const favoriteresponse = await Favorite.destroy({
  //   where: {
  //     UserId: id
  //   }
  // })


  // for (let favorite of req.body.values.diet) {
  //   console.log(favorite);
  //   await Favorite.create({
  //     UserId: id,
  //     DietId: favorite
  //   })
  // }
  res.send('updated')
}


const signUp = async (req, res) => {
  const body = req.body
  console.log(req.headers)
  const hash = await bcrypt.hash(req.body.password, 10)
  try {
    const { firstName, lastName, email, password } = body
    console.log('sss', body);
    // const hash = await bcrypt.hash(password, 10)
    const response = await User.create({
      email,
      firstName, lastName,
      password: hash
    })
    const token = await jwt.sign({
      _id: response.id
    }, process.env.JWT_SECRET_KEY)

    const update = User.update({
      token: token,
    }, {
      where: {
        id: response.id
      }
    })
    sendConfimatioEmail(body.email, response.id)
    console.log('the email')

    res.send(response.id)

  } catch (err) {
    console.log(err)
    return
    res.sendStatus(403)
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
    const passValues = await bcrypt.compare(password, user.password)
    // req.setCookie(`Cookie token name`, `encrypted cookie string Value`);
    if (passValues) {
      if (!user.verify) res.send({ message: "please confirm your email" });
      else {
        const id = user.id
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY)
        req.session.user = user
        res.json({ auth: true, user, token });

      }

    } else {
      res.send({ message: "Wrong email/password combination!" });
    }
  } else {
    return res.send({ message: "User doesn't exist" });
  }
}

const verfication = async (req, res) => {
  const token = req.params.token
  const user = await User.update(
    {
      verify: true
    },
    {
      where: {
        token: token

      }
    })
  console.log(user)
  res.send('verified')
}



router.route("/")
  .get(getAllUsers).put(verifyJWT, updateUser)
  .post(validation(userSchema), signUp)
router.route("/getUser").post(verifyJWT, getUser)
router.route('/login').post(login)
router.route('/protected').post(verifyJWT, login)
router
  .route("/:userId")
  .delete(deleteUser)
router.route('/confiramation/:token').get(verfication)
module.exports = router;
