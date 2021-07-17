const express = require("express");
const router = express.Router();
const db = require('../models/index')
const multer = require('multer')
const { order, recipeInfo, categoryOfRecipe, dietOfRecipe,
  ingredientsOfRecipe } = require('../DAL/api');

const Recipe = db.recipes;
const User = db.users;
const Ingredient = db.ingredients;
const Instruction = db.instructions;
const Category = db.categories;
const Image = db.images;
const Diet = db.diets;
const RecipeIngredient = db.recipeingredients;
const RecipeCategory = db.recipecategories;
const RecipeDiet = db.recipediets;
const Units = db.measuringunits
const Favorite = db.favorites;
Recipe.hasMany(Image, {
  foreignKey: 'recipeId'
})
Image.belongsTo(Recipe)

Recipe.hasMany(Instruction, {
  foreignKey: 'recipeId'
})
Instruction.belongsTo(Recipe)

// Recipe.hasMany(Ingredient, {
//   foreignKey: 'recipeId'
// })
// Ingredient.belongsTo(Recipe)

Recipe.belongsToMany(Category, {
  through: RecipeCategory,
  foreignKey: 'categoryId',
  otherKey: 'categoryId'
})


Recipe.hasMany(RecipeCategory, {
  foreignKey: 'categoryId',
})
RecipeCategory.belongsTo(Recipe)


const getAllRecipes = async (req, res) => {
  console.log(req);
  try {
    const q = req.query;
    if (q.orderBy) {
      const response = await Recipe.findAll({
        order: [[q.orderBy, q.order]],
        limit: Number(q.size),
        offset: Number((q.limit) * q.size),
        include: [
          {
            model: Image, attributes: ['url'],
          },
        ]
      })
      res.status(200).json(response)
    } else {
      const response = await Recipe.findAll({
        include: [
          {
            model: Image, attributes: ['url'],
          },
        ]
      })
      res.json(response)
    }

  } catch (err) {
    console.log(err);

  }
}


const filesStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads',)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '---' + file.originalname,)
  }
})
const upload = multer({
  storage: filesStorageEngine
})



const getSpecificRecipe = async (req, res) => {
  try {
    const response = await recipeInfo(req.body.id)
    res.json(response)
  } catch (err) {
    res.status(404).send(err)
  }
};

const awaitToRcipe = async (req, res) => {
  const response = await recipeInfo(req.body.id)
  res.json(response)
}


const category = async (req, res) => {
  const response = await categoryOfRecipe(req.body.id)
  res.send(response)
}

const diet = async (req, res) => {
  const response = await dietOfRecipe(req.body.id)
  res.send(response)
}



const mostPopular = async (req, res) => {
  try {
    const response = await Recipe.findAll({
      order: [['views', "desc"]],
      limit: 6,
      include: [
        {
          model: Image
        },
        {
          model: Category, attributes: ['name']
        }
      ]
    })
    res.status(200).send(response)
  } catch (err) {
    console.log(err);

    res.status(400).send(err)

  }



}

const deleteRecipe = async (req, res) => {
  const recipes = await allRecipes();
  recipes.filter((item) => item.recipeId !== req.params.recipeId);
  res.send(recipes);
};

const recipeIngrediens = async (req, res) => {
  const response = await ingredientsOfRecipe(req.body.id)
  res.send(response)
}


const incrementView = async (req, res) => {
  const id = req.body.id
  const view = await Recipe.findOne({ where: { id } });
  await view.increment('views', { by: 1 });
  res.send(view)
}



router.post("/upload", upload.single('image'), async (req, res) => {
  console.log(req.file, JSON.parse(req.body.recipe));
  const values = JSON.parse(req.body.recipe)
  const { name, source, userId, description, sourceUrl, views,
    isPrivate, prepTimeMin = 27 } = values
  try {
    const response = await Recipe.create({
      name, source, userId, description, sourceUrl, views,
      isPrivate, prepTimeMin
    })
    const id = response.id
    for (const prop of values.category) {
      await RecipeCategory.create({ recipeId: id, categoryId: prop })
    }
    for (const prop of values.diet) {
      await RecipeDiet.create({ recipeId: id, dietId: prop })
    }
    for (const prop of values.instructions) {
      console.log(prop.measureUnit);
      await RecipeIngredient.create({
        recipeId: id, ingredientId: prop.ingredient,
        unitId: prop.measureUnit, quantity: prop.quantity
      })
    }
    for (const prop of values.guide) {
      await Instruction.create({ recipeId: id, instruction: prop.instruction })
    }
    const imageresponse = await Image.create({ recipeId: id, url: `uploads/${req.file.filename}` })
    res.send(imageresponse)

  } catch (err) {
    console.log(err);

    res.status(404).send(err)
  }

})
const myRecipes = async (req, res) => {
  console.log(req.body.id);

  const response = await Recipe.findAll({
    where: { userId: req.body.id },
    include: [{
      model: Image,
      attributes: ["url"]
    }]
  })
  res.send(response)
}

router.post("/update", upload.single('image'), async (req, res) => {
  console.log(req.body, req.file);
  const values = JSON.parse(req.body.recipe);
  console.log(values);
  const update = await Recipe.update(
    {
      name: values.name, source: values.source, sourceUrl: values.sourceUrl,
      description: values.description,
      isPrivate: values.isPrivate,
      prepTimeMin: values.prepTimeMin
    },
    {
      where: {
        id: values.id
      }
    }
  )
  const destroyInstructions = await Instruction.destroy({
    where: {
      recipeId: values.id
    }
  })

  const destroyCategory = await RecipeCategory.destroy({
    where: {
      recipeId: values.id
    }
  })
  console.log(destroyCategory);

  const destroyDiets = await RecipeDiet.destroy({
    where: {
      recipeId: values.id
    }
  })
  const destroyIng = await RecipeIngredient.destroy({
    where: {
      recipeId: values.id
    }
  })
  const destroyImg = await Image.destroy({
    where: {
      recipeId: values.id
    }
  })

  for (const prop of values.category) {
    await RecipeCategory.create({ recipeId: values.id, categoryId: prop })
  }
  for (const prop of values.diet) {
    await RecipeDiet.create({ recipeId: values.id, dietId: prop })
  }
  for (const prop of values.instructions) {
    console.log(prop.measureUnit);
    await RecipeIngredient.create({
      recipeId: values.id, ingredientId: prop.ingredient,
      unitId: prop.measureUnit, quantity: prop.quantity
    })
  }
  for (const prop of values.guide) {
    await Instruction.create({ recipeId: values.id, instruction: prop.instruction })
  }
  const imageresponse = await Image.create({ recipeId: values.id, url: `uploads/${req.file.filename}` })
  res.send(imageresponse)

})



router.route("/").get(getAllRecipes).post(getSpecificRecipe);
router.route("/getRecipe").post(awaitToRcipe);
router.route("/increment").post(incrementView)
// router.route("/update").post(updateRecipe)
router.route("/diet").post(diet);
router.route("/category").post(category);
router.route("/myrecipes").post(myRecipes);
router.route("/popular").post(mostPopular);
router.route("/ingredient").post(recipeIngrediens);
router
  .route("/:recipeId")
  // .post(updateRecipe)
  .delete(deleteRecipe);

module.exports = route