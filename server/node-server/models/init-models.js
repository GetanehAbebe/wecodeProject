var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _comments = require("./comments");
var _diets = require("./diets");
var _favorites = require("./favorites");
var _images = require("./images");
var _ingredients = require("./ingredients");
var _instructions = require("./instructions");
var _likes = require("./likes");
var _measuringunits = require("./measuringunits");
var _recipecategories = require("./recipecategories");
var _recipediets = require("./recipediets");
var _recipeingredients = require("./recipeingredients");
var _recipes = require("./recipes");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var diets = _diets(sequelize, DataTypes);
  var favorites = _favorites(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var ingredients = _ingredients(sequelize, DataTypes);
  var instructions = _instructions(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var measuringunits = _measuringunits(sequelize, DataTypes);
  var recipecategories = _recipecategories(sequelize, DataTypes);
  var recipediets = _recipediets(sequelize, DataTypes);
  var recipeingredients = _recipeingredients(sequelize, DataTypes);
  var recipes = _recipes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  ingredients.belongsToMany(recipes, { as: 'recipeId_recipes_recipeingredients', through: recipeingredients, foreignKey: "ingredientId", otherKey: "recipeId" });
  recipes.belongsToMany(ingredients, { as: 'ingredientId_ingredients', through: recipeingredients, foreignKey: "recipeId", otherKey: "ingredientId" });
  recipes.belongsToMany(users, { as: 'userId_users', through: comments, foreignKey: "recipeId", otherKey: "userId" });
  recipes.belongsToMany(users, { as: 'userId_users_likes', through: likes, foreignKey: "recipeId", otherKey: "userId" });
  users.belongsToMany(recipes, { as: 'recipeId_recipes', through: comments, foreignKey: "userId", otherKey: "recipeId" });
  users.belongsToMany(recipes, { as: 'recipeId_recipes_likes', through: likes, foreignKey: "userId", otherKey: "recipeId" });
  recipecategories.belongsTo(categories, { as: "category", foreignKey: "categoryId"});
  categories.hasMany(recipecategories, { as: "recipecategories", foreignKey: "categoryId"});
  recipediets.belongsTo(diets, { as: "diet", foreignKey: "dietId"});
  diets.hasMany(recipediets, { as: "recipediets", foreignKey: "dietId"});
  recipeingredients.belongsTo(ingredients, { as: "ingredient", foreignKey: "ingredientId"});
  ingredients.hasMany(recipeingredients, { as: "recipeingredients", foreignKey: "ingredientId"});
  recipeingredients.belongsTo(measuringunits, { as: "unit", foreignKey: "unitId"});
  measuringunits.hasMany(recipeingredients, { as: "recipeingredients", foreignKey: "unitId"});
  comments.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(comments, { as: "comments", foreignKey: "recipeId"});
  instructions.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(instructions, { as: "instructions", foreignKey: "recipeId"});
  likes.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(likes, { as: "likes", foreignKey: "recipeId"});
  recipecategories.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(recipecategories, { as: "recipecategories", foreignKey: "recipeId"});
  recipediets.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(recipediets, { as: "recipediets", foreignKey: "recipeId"});
  recipeingredients.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(recipeingredients, { as: "recipeingredients", foreignKey: "recipeId"});
  comments.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(comments, { as: "comments", foreignKey: "userId"});
  likes.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(likes, { as: "likes", foreignKey: "userId"});

  return {
    categories,
    comments,
    diets,
    favorites,
    images,
    ingredients,
    instructions,
    likes,
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
