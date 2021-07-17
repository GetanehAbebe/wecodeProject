var express = require("express");
var router = express.Router();
const multer = require('multer');
const { userLogin, recipeByUser, insertFavorite, insertUser, getDataFromApi } = require('../DAL/api')


/* GET home page. */

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express1" });
// });
// router.get("/get", function (req, res, next) {
//   res.send("getaneh2");
// });
const login = async (req, res) => {
    console.log(req.body.email);
    try {
        const response = await userLogin(req.body.email, req.body.password)
        res.send(response)
    } catch (err) {
        res.status(404).send(err)
    }
};
router.route('/login').post(login)

router.route('/middle', () => validation(userSchema), (req, res) => {
    const response =  User.findOne({
      where: {
        id: 7
      }
    })
    res.send(response)
  })
  

module.exports = router;
