const express = require("express");
const router = express.Router();
const db = require('../models/index')
const multer = require('multer')
const validation = require('../middlewares/checkrecipe')
const recipeSchema = require('../validations/recipeValidation')
const { recipeInfo, categoryOfRecipe, dietOfRecipe,
  ingredientsOfRecipe } = require('../DAL/api');
const { Op } = require("sequelize");
const verifyJWT = require('../middlewares/verifyJWT')


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
const Like = db.likes
Recipe.hasMany(Image, {
  foreignKey: 'recipeId'
})
Image.belongsTo(Recipe)

RecipeIngredient.hasMany(Units, {
  foreignKey: 'id'
})
// Units.belongsTo(RecipeIngredient)

Recipe.hasMany(Instruction, {
  foreignKey: 'recipeId'
})
Instruction.belongsTo(Recipe)

Recipe.belongsToMany(Diet, {
  through: RecipeDiet,
  foreignKey: 'recipeId',
  otherKey: 'dietId'
})

Recipe.belongsToMany(Category, {
  through: RecipeCategory,
  foreignKey: 'recipeId',
  otherKey: 'categoryId'
})

Recipe.belongsToMany(Units, {
  through: RecipeIngredient,
  foreignKey: 'recipeId',
  otherKey: 'unitId'
})

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: 'recipeId',
  otherKey: 'ingredientId'
})


const getAllRecipes = async (req, res) => {
  try {
    const q = req.query;
    if (q.orderBy) {
      const response = await Recipe.findAll({
        order: [[q.orderBy, q.order]],
        limit: Number(q.size),
        offset: Number((q.limit) * q.size),
        include: [
          {
            model: Image,
            attributes: ['url'],

          },
          {
            model: Ingredient, attributes: ["name"]
          },
          {
            model: Category, attributes: ['name']
          },

        ]
      })
      res.status(200).json(response)
    } else {
      const response = await Recipe.findAll({
        include: [
          {
            model: Image,
            attributes: ["url"]
          },
          {
            model: Category,
          },
          {
            model: Diet
          },
          // {
          //   model: Ingredient
          // }

        ]
      })
      res.json(response)
    }

  } catch (err) {
    console.log(err);
    res.send(err)

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

// const ingredientsFields = await queryPromise(`select quantity,mu.name as id, mu.id as 
// 'measureUnit',i.name as 'ingredient' from recipeingredients as ri join ingredients as i on ri.ingredientId=i.id join measuringunits as mu on
//   mu.id = ri.unitId where recipeId=${recipeId}`)
// const dietsFields = await queryPromise(`select name,dietId from recipediets join diets on diets.id=recipediets.dietid where recipeId=${recipeId}`)
const getSpecificRecipe = async (req, res) => {
  console.log('body', req.body);
  req.body.id = 1153
  try {
    const response = await Recipe.findOne({
      where: {
        id: req.body.id
      },
      // include: [
      //   {
      //     model: Image, attributes: ['url'],
      //   },
      //   {
      //     model: Category,
      //   },
      //   {
      //     model: Diet
      //   },

      // ]
    })
    res.send(response)
  } catch (err) {
    res.send(err)
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
    res.status(400).send(err)

  }
}


const deleteRecipe = async (req, res) => {
  const id = req.body.recipeId
  const userId = req.body.userId
  const deleteInstructions = await Instruction.destroy({
    where: {
      recipeId: id
    }
  })
  const deleteCategory = await RecipeCategory.destroy({
    where: {
      recipeId: id
    }
  })
  const delteIngredient = await RecipeIngredient.destroy({
    where: {
      recipeId: id
    }
  })
  const delteDiet = await RecipeDiet.destroy({
    where: {
      recipeId: id
    }
  })
  const dletImage = await Image.destroy({
    where: {
      recipeId: id
    }
  })
  const destoryLike = await Like.destroy({
    where: {
      recipeId: id,
      userId
    }
  })
  const response = await Recipe.destroy({
    where: {
      id: id
    }
  })
  res.send('deleted')
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
  const values = JSON.parse(req.body.recipe)
  const { name, source, description, sourceUrl, views,
    prepTimeMin = 27, userId = 88 } = values
  try {
    const response = await Recipe.create({
      name, source, userId, description, sourceUrl, views,
      prepTimeMin
    })
    const id = response.id
    for (const prop of values.category) {
      await RecipeCategory.create({ recipeId: id, categoryId: prop })
    }
    for (const prop of values.diet) {
      await RecipeDiet.create({ recipeId: id, dietId: prop })
    }

    for (const prop of values.guide) {
      await Instruction.create({ recipeId: id, instruction: prop.instruction })
    }
    const imageresponse = await Image.create({ recipeId: id, url: `uploads/${req.file.filename}` })

    for (const prop of values.instructions) {
      console.log(prop.measureUnit);
      const check = await Ingredient.findAll({
        where: {
          name: prop.ingredient
        }
      })
      console.log('check', check[0]);
      let name = prop.ingredient
      console.log('props', prop.ingredient);

      if (check.length === 0) {
        const ing = await Ingredient.create({
          name: name
        })
        prop.ingredient = ing.id
        await RecipeIngredient.create({
          recipeId: id, ingredientId: ing.id,
          unitId: prop.measureUnit, quantity: prop.quantity
        })
      } else {
        const a = await RecipeIngredient.create({
          recipeId: id, ingredientId: check[0].dataValues.id,
          unitId: prop.measureUnit, quantity: prop.quantity
        })
      }
    }
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
  for (const prop of values.category) {
    await RecipeCategory.create({ recipeId: values.id, categoryId: prop })
  }
  for (const prop of values.diet) {
    await RecipeDiet.create({ recipeId: values.id, dietId: prop })
  }

  for (const prop of values.guide) {
    await Instruction.create({ recipeId: values.id, instruction: prop.instruction })
  }
  if (req.file) {
    const destroyImg = await Image.destroy({
      where: {
        recipeId: values.id
      }
    })
    const imageresponse = await Image.create({ recipeId: values.id, url: `uploads/${req.file.filename}` })
  }
  for (const prop of values.instructions) {
    console.log('measureUnit', prop.ingredient);
    const check = await Ingredient.findAll({
      where: {
        name: prop.ingredient
      }
    })
    console.log('check', check[0]);
    let name = prop.ingredient
    console.log('props', prop.ingredient);
    if (check.length === 0) {
      const ing = await Ingredient.create({
        name: prop.ingredient
      })
      prop.ingredient = ing.id
      await RecipeIngredient.create({
        recipeId: values.id, ingredientId: ing.id,
        unitId: prop.measureUnit, quantity: prop.quantity
      })
    } else {
      const a = await RecipeIngredient.create({
        recipeId: values.id, ingredientId: check[0].dataValues.id,
        unitId: prop.measureUnit, quantity: prop.quantity
      })
    }
  }
  res.send('updated')
})


const advancedsearch = async (req, res) => {
  console.log(req.body.values)
  const name = req.body.values.recipeText
  const categories = req.body.values.categories.map(i => i.id)
  const ingredients = req.body.values.ingredients.map(i => i.id)
  const diets = req.body.values.diets.map(i => i.id)
  const result = await Recipe.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      },
    },
    include: [
      {
        model: Image,
        attributes: ["url"]
      },
      {
        model: Category,
        where: {
          id: (categories.length <= 0 ? { [Op.notIn]: categories } : { [Op.in]: [...categories] })
        }
      },
      {
        model: Diet,
        where: {
          id: (diets.length <= 0 ? { [Op.notIn]: diets } : { [Op.in]: [...diets] })
        }
      },
      {
        model: Ingredient,
        where: {
          [Op.and]: {
            id: (ingredients.length <= 0 ? { [Op.notIn]: ingredients } : { [Op.in]: [...ingredients] })
          }

        }
      }
    ],

  }
  )
  res.send(result)
}


router.route("/").get(getAllRecipes)
  .post(getSpecificRecipe)
router.route("/getRecipe").post(awaitToRcipe);
router.route("/increment").post(incrementView)
router.route("/diet").post(diet);
router.route("/category").post(category);
router.route("/myrecipes").post(verifyJWT, myRecipes);
router.route("/popular").get(mostPopular);
router.route("/ingredient").post(recipeIngrediens);
router.route('/delete').post(verifyJWT, deleteRecipe)
router.route('/advancedsearch').post(advancedsearch)
advancedsearch
router
  .route("/:recipeId")
  .delete(deleteRecipe);
module.exports = router;
