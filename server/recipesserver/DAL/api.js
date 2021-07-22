const db = require('../db')
const { queryPromise } = require('../db')
const getDataFromApi = async (type) => {
    const query = `select * from wecodepoject2.${type}`
    const response = await queryPromise(query)
    return response;
}

const insertUser = async (values) => {
    const query = `insert into wecodeproject.users(firstname,lastname,email,password) 
    values('${values.firstName}',
    '${values.lastName}','${values.email}','${values.password}')`
    const response = await queryPromise(query)
    return response;
}

const insertFavorite = async (userId, value) => {
    let result = '';
    for (const dietId in value) {
        result += `(${userId},${dietId}),`
    }
    const list = result.slice(0, result.length - 1)
    const query = `insert into favorites(userId,dietId) values${list}`
    const response = await queryPromise(query)
    return response
}
const insertRecipeDiets = async (recipeId, value) => {
    let result = '';
    for (const dietId in value) {
        result += `(${recipeId},${dietId}),`
    }
    const list = result.slice(0, result.length - 1)
    const query = `insert into recipediets(recipeId,dietId) values${list}`
    const response = await queryPromise(query)
    return response
}

const userLogin = async (email, password) => {
    const query = `select * from users where email='${email}' and password='${password}'`
    const response = await queryPromise(query)
    return response
}

const insertRecipeCategories = async (recipeId, value) => {
    let result = '';
    for (const categoryId in value) {
        result += `(${recipeId},${categoryId}),`
    }
    const list = result.slice(0, result.length - 1)
    const query = `insert into wecodepoject2.recipecategories(recipeId,categoryId) values${list}`
    const response = await queryPromise(query)
    return response
}

const insertRecipeIngredients = async (recipeId, value) => {
    let result = '';
    for (const key of value) {
        console.log(key);

        result += `(${recipeId},${key.ingredient},${key.measureUnit},${key.qauntity}),`
    }
    const list = result.slice(0, result.length - 1)
    const query = `insert into recipeingredients(recipeId,ingredientId,unitId,quantity) values${list}`
    const response = await queryPromise(query)
    return response
}
const insertRecipeInstructions = async (recipeId, value) => {
    let result = '';
    for (const key in value) {
        result += `(${recipeId},${key.guide}),`
    }
    const list = result.slice(0, result.length - 1)
    const query = `insert into recipeingredients(recipeId,instruction) values${list}`
    const response = await queryPromise(query)
    return response
}



const getRecipe = async (recipeId) => {
    const query = `select * from recipes where recipeId=${recipeId}`
    const response = await queryPromise(query)
    return response
}

const recipeByUser = async (userId) => {
    const query = `select * from recipes where userId=${userId} join images on recipeId=recipes.id`
    const response = await queryPromise(query)
    return response
}

const getRecipesImages = async () => {
    const query = `select recipes.id,images.url as image from recipes join images on recipes.id=images.recipeId`
    const response = await queryPromise(query)
    return response
}

const inserRecipe = async (values) => {
    const query = `insert into recipes(name,userId,description,
        source,sourct_url,Is_private,prep_time_min)
         values(${values.name},${values.userId},${values.description}
            ,${values.source},'${values.sourceUrl},${values.isPrivate},${values.prep_time_min})`
    const response = await queryPromise(query)
    return response;
}


const categoryOfRecipe = async (recipeId) => {
    const response = await queryPromise(`select categoryId from recipeCategories where recipeId=${recipeId}`)
    return response
}
const dietOfRecipe = async (recipeId) => {
    const response = await queryPromise(`select dietId from recipediets where recipeId=${recipeId}`)
    return response
}

const ingredientsOfRecipe = async (recipeId) => {
    const response = await queryPromise(`select quantity, mu.id as 'measureUnit',i.id as 'ingredient'  from recipeingredients as ri join ingredients as i on ri.ingredientId=i.id join measuringunits as mu on
    mu.id = ri.unitId where recipeId=${recipeId}`)
    return response
}

const recipeInfo = async (recipeId) => {
    const recipe = {}
    const recipeFields = await queryPromise(`select recipes.*,users.firstname,users.lastname from recipes join users on 
    recipes.userId=users.id where recipes.id=${recipeId}`)
    const categoriesFields = await queryPromise(`select name,categoryId from recipecategories join categories
    on recipecategories.categoryId=id where recipeId=${recipeId}`)
    const instructionsFields = await queryPromise(`select instruction from instructions where recipeId=${recipeId}`)
    const ingredientsFields = await queryPromise(`select quantity,mu.name as id, mu.id as 'measureUnit',i.name as 'ingredient' from recipeingredients as ri join ingredients as i on ri.ingredientId=i.id join measuringunits as mu on
    mu.id = ri.unitId where recipeId=${recipeId}`)
    const dietsFields = await queryPromise(`select name,dietId from recipediets join diets on diets.id=recipediets.dietid where recipeId=${recipeId}`)
    const imagesFields = await queryPromise(`select url from images where recipeId=${recipeId}`)
    console.log(recipeFields);
    recipe.recipe = recipeFields[0]
    recipe.category = categoriesFields
    recipe.instructions = instructionsFields
    recipe.ingredients = ingredientsFields;
    recipe.diet = dietsFields;
    recipe.images = imagesFields
    console.log(recipe);
    return (recipe)
}

const getInstructions = async (recipeId) => {
    const query = `select * from instructions where recipeId=${recipeId}`
    const response = await queryPromise(query)
    return response;
}

const order = async (type, order = 'asc') => {
    const query = `select * from recipes order by ${type} ${order}`
    console.log('here');
    const response = await queryPromise(query)
    return response;
}

module.exports = {
    getDataFromApi,
    insertUser,
    insertFavorite,
    insertRecipeDiets,
    insertRecipeCategories,
    inserRecipe,
    getRecipe,
    getRecipesImages,
    getInstructions,
    recipeByUser,
    userLogin,
    order,
    insertRecipeIngredients,
    insertRecipeInstructions,
    recipeInfo,
    ingredientsOfRecipe,
    categoryOfRecipe,
    dietOfRecipe

}