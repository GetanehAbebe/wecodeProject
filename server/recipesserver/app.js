const express = require("express");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require('cors')
const app = express();
const multer = require("multer")
const bodyParser = require('body-parser')
    ;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");
const ingredientsRouter = require("./routes/ingredients");
const categoriesRouter = require("./routes/categories");
const dietsRouter = require("./routes/diets");
const unitsRouter = require("./routes/units");
const instructionsRouter = require('./routes/instructions')
const favoritesRouter = require('./routes/favorites')
const recipe_ingredientsRouter = require('./routes/recipe_ingredients')
const recipe_likes = require('./routes/likes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"))
app.set('view engine', "jade")
app.use(cors())
app.use(logger("dev"));
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/categories", categoriesRouter);
app.use("/diets", dietsRouter);
app.use("/units", unitsRouter);
app.use("/instructions", instructionsRouter);
app.use("/favorites", favoritesRouter);
app.use("/recipe_ingredients", recipe_ingredientsRouter);
app.use("/likes", recipe_likes);

module.exports = app;

