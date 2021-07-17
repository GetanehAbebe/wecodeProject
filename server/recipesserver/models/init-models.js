var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _diets = require("./diets");
var _favorites = require("./favorites");
var _images = require("./images");
var _ingredients = require("./ingredients");
var _instructions = require("./instructions");
var _measuringunits = require("./measuringunits");
var _recipecategories = require("./recipecategories");
var _recipediets = require("./recipediets");
var _recipeingredients = require("./recipeingredients");
var _recipes = require("./recipes");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var diets = _diets(sequelize, DataTypes);
  var favorites = _favorites(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var ingredients = _ingredients(sequelize, DataTypes);
  var instructions = _instructions(sequelize, DataTypes);
  var measuringunits = _measuringunits(sequelize, DataTypes);
  var recipecategories = _recipecategories(sequelize, DataTypes);
  var recipediets = _recipediets(sequelize, DataTypes);
  var recipeingredients = _recipeingredients(sequelize, DataTypes);
  var recipes = _recipes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  recipecategories.belongsTo(categories, { as: "category", foreignKey: "categoryId"});
  categories.hasMany(recipecategories, { as: "recipecategories", foreignKey: "categoryId"});
  images.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(images, { as: "images", foreignKey: "recipeId"});

  return {
    categories,
    diets,
    favorites,
    images,
    ingredients,
    instructions,
    measuringunits,
    recipecategories,
    recipediets,
    recipeingredients,
    recipes,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
