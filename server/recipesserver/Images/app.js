// const User = require('./User')
// const Recipe = require('./Recipe')
// const Category = require('./Category')
// const Diet = require('./Diet')
// const Favorite = require('./Favorite')
// const Image = require('./Image')
// const Ingredient = require('./Ingredient')
// const Instruction = require('./Instruction')
// const Unit = require('./MeasuringUnit')
// const RecipeCategory = require('./RecipeCategory')
// const RecipeIngredient = require('./RecipeIngredient')
// const RecipeDiet = require('./RecipeDiet')




// User.hasMany(Recipe, {
//     foreignKey: 'userId'
// })
// Recipe.belongsTo(User)

// User.hasMany(Favorite, {
//     foreignKey: 'userId'
// })
// Favorite.belongsTo(User)

// Diet.hasMany(Favorite, {
//     foreignKey: 'dietId'
// })
// Favorite.belongsTo(Diet)

// Recipe.hasMany(RecipeIngredient, {
//     foreignKey: 'recipeId'
// })
// RecipeIngredient.belongsTo(Recipe)


// Recipe.hasMany(RecipeCategory, {
//     foreignKey: 'recipeId'
// })

// RecipeCategory.belongsTo(Recipe)

// Recipe.hasMany(RecipeDiet, {
//     foreignKey: 'recipeId'
// })
// RecipeDiet.belongsTo(Recipe)

// Recipe.hasMany(Instruction, {
//     foreignKey: 'recipeId'
// })
// Instruction.belongsTo(Recipe)

// Recipe.hasMany(Image, {
//     foreignKey: 'recipeId'
// })
// Image.belongsTo(Recipe)



// //=========================================
// RecipeCategory.hasMany(Category, {
//     foreignKey: 'id'
// })
// Category.belongsTo(RecipeCategory)

// Diet.hasMany(Diet, {
//     foreignKey: 'id'
// })
// Diet.belongsTo(Diet)

// RecipeIngredient.hasMany(Ingredient, {
//     foreignKey: 'id'
// })
// Ingredient.belongsTo(RecipeIngredient)



// db.sync().then(result => {
//     console.log(result)
// }).then(result => console.log(result)
// )
