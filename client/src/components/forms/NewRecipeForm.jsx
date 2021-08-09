import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { Accordion, Card, Button, Form, Col, Row, Table, } from "react-bootstrap";
import useForm from "../utills/useForm";
import validate from "../utills/validateInfo";
import { getData, insertDataToDB, ingredientsOfRecipe, uploadRecipe, appentIngredient, getRecipeDetails, updateRecipe } from "../DAL/api";
import { useHistory } from "react-router-dom";
import ErrorMessages from "../utills/ErrorMessages";
import { useFormik } from "formik";
const Cookies = require('js-cookie')
const axios = require('axios')


function NewRecipeForm({ match, recipeId, mode }) {
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null)
  const [units, setUnits] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [guide, setGuide] = useState([]);
  const [diets, setDiets] = useState([]);
  const [recipeIngredient, setRecipeIngredient] = useState({})
  const [recipeGuide, setRecipeGuide] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [newIngredient, setNewIngredient] = useState('')
  const history = useHistory()
  const [addIng, setAddIng] = useState(false)
  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState([]);
  // const { handleSubmit, handleChange, values, errors } = useForm(submit, validate);




  const formik = useFormik({
    initialValues: {
      name: "",
      source: "",
      sourceUrl: "",
      diet: [],
      category: [],
      prepTimeMin: '',
      description: '',
      image: '',
      ingredient: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3)
        .max(30).required(),
      // image: Yup.string().required("required"),
      ingredient: Yup.string().max(20).min(3).matches(/[a-z]/, 'must be letters in lowercase'),
      // diet: Yup.array().min(2, 'choose at least 2 types').required(),
      // category: Yup.array().min(2, 'choose at least 2 types').required(),
      prepTimeMin: Yup.string(),
      description: Yup.string().min(3).max(150),
      source: Yup.string().min(3, 'min 3 charachters').max(40, 'must be 20 charachters or less').required('required')
    }),
    onSubmit: async (values) => {
      const data = new FormData();
      formik.values.guide = guide;
      formik.values.userId = Cookies.get('user')
      formik.values.instructions = instructions

      if (recipeId) formik.values.id = recipeId
      data.append("image", image)
      data.append("user", Cookies.get('user'))
      data.append("recipe", JSON.stringify(formik.values))
      if (!recipeId) {
        const response = await uploadRecipe(data)
      } else {
        const update = await updateRecipe(data)
        submit()
      }

    },

  })
  const deleteInstruction = (index) => {
    instructions.splice(index, 1);
    setInstructions([...instructions]);
  };

  const deleteGuide = (index) => {
    guide.splice(index, 1);
    setGuide([...guide]);
  };
  const checkThefilds = (obj) => {
    if (Object.keys(obj).length === 0 || Object.keys(obj).length < 3) return false
    for (const prop in obj) {
      console.log('prop', prop);
      if (!obj[prop].length) return false

    }
    return true
  }

  const addToList = (value) => {
    if (value === 'ingredients') {

      console.log(formik.values.ingredient, instructions.includes(formik.values.ingredient));
      const check = instructions.filter(item => item.ingredient === formik.values.ingredient)
      if (!formik.errors.ingredient) {
        recipeIngredient.ingredient = formik.values.ingredient
      }

      if (check.length === 0) {
        if (checkThefilds(recipeIngredient)) {
          setInstructions([...instructions, { ...recipeIngredient }])
          formik.values.ingredient = ''
        } else {
          alert('please check the fields')
        }
      }
      else alert(`you can't insert the ${formik.values.ingredient} twice into ingredients`)
    }
    if (value === 'guide') setGuide([...guide, recipeGuide])

  }


  const insertDataToForm = (recipe) => {
    console.log('recipe from insert into table',recipe)
    // formik.values.name = recipe.recipe.name
    // formik.values.source = recipe.recipe.source
    // formik.values.sourceUrl = recipe.recipe.sourceUrl
    // formik.values.description = recipe.recipe.description
    // formik.values.isPrivate = !!recipe.recipe.isPrivate
    // formik.values.prepTimeMin = recipe.recipe.prepTimeMin
    // formik.values.image = recipe.images[0]?.url
    formik.values.name = recipe.name
    formik.values.source = recipe.source
    formik.values.sourceUrl = recipe.sourceUrl
    formik.values.description = recipe.description
    formik.values.isPrivate = !!recipe.isPrivate
    formik.values.prepTimeMin = recipe.prepTimeMin
    // formik.values.image = recipe.images[0]?.url
    console.log(recipe.category);
    setImage(recipe.images[0]?.url)
    console.log(recipe.ingredients);
    setGuide(recipe.instructions)
    setInstructions(recipe.ingredients)
    const arr = []
    for (let x of recipe.categories) {
      console.log(x);
      arr.push(+(x.categoryId || x.id))
    }
    formik.values.category = arr
    const diets = []
    for (let x of recipe.diets) {

      diets.push(+(x.id || x.dietId))
    }
    formik.values.diet = diets;
  }

  async function submit() {
    // if (checkErrors(errors)) {
    const data = new FormData();
    formik.values.guide = guide;
    formik.values.instructions = instructions

    if (recipeId) formik.values.id = recipeId
    data.append("image", image)
    data.append("user", Cookies.get('user'))
    data.append("recipe", JSON.stringify(formik.values))
    if (!recipeId) {
      const response = await uploadRecipe(data)
      if (response) setMessage('Successfully completed')
    } else {
      const update = await updateRecipe(data)

      if (update) setMessage('updated')
    }
  }
  const changeIngredient = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredient') return
    // console.log('ingredient', value);

    // if (name === 'ingredient') {

    //   for (let x of instructions) {
    //     console.log(x.ingredient);
    //     if (x.ingredient === value) alert('the ingredient already inserted')

    //   }
    // }


    setRecipeIngredient({ ...recipeIngredient, [name]: value })
  }

  const changeGuide = (e) => {
    const { name, value } = e.target;
    setRecipeGuide({ ...recipeGuide, [name]: value })
  }


  const addIngtoDB = async () => {
    for (let ing of ingredients) {
      if (ing.name === newIngredient) alert('already exist')
    }
    const response = await appentIngredient(newIngredient);
    setAddIng(false)
  }

  useEffect(async () => {
    if (recipeId) {
      setEditMode(true)
      // const instruc = await ingredientsOfRecipe(recipeId)
      const formRecipe = await getRecipeDetails(recipeId)

      insertDataToForm(formRecipe)
      console.log("instruc", formRecipe);

    }
    if (!Cookies.get('user')) history.push('/login')
    const fetchDiets = await getData('diets')
    console.log(fetchDiets)
    const fetchUnits = await getData('units')
    const fetchCategories = await getData('categories')
    const fetchIngredient = await getData('ingredients')
    setDiets(fetchDiets.map(item => {
      return {
        select: formik.values.diet.includes(item.id),
        name: item.name,
        id: item.id || item["_id"]
      }
    }));
    setUnits(fetchUnits);
    setIngredients(fetchIngredient);
    setCategories(fetchCategories.map(cat => {
      console.log(formik.values.category)
      return {
        select: formik.values.category.includes(cat.id),
        name: cat.name,
        id: cat.id || cat["_id"]
      }
    }));

  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='text-dark'>
      {message.length ? <p>{message}</p> : null}
      <div className="form-inner">
        <h1 className='text-center'>{editMode ? "Update Recipe" : "Add Recipe"}</h1>
        <Row className="">
          <Col className="col-md-7">
            <Form.Label>Recipe name </Form.Label>
            <Form.Control type="text" name="name" value={formik.values}{...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name ? <small className='text-danger'>{formik.errors.name} </small> : ""}
          </Col>
          <Col>
            <Form.File label="Image" name="image" accept=".jpg, .png,.jpeg" DefaultValue={formik.values}
              onChange={(e) => {
                setImage(e.target.files[0])
                formik.handleChange(e)
              }}
            />
            {formik.touched.image && formik.errors.image ? <small className='text-danger'>{formik.errors.image} </small> : ""}
          </Col>
        </Row>
        <Row className="container-fluid">
          <Col>
            <Form.Label> source</Form.Label>
            <Form.Control type="text" placeholder="recipe source" name="source" value={formik.values}{...formik.getFieldProps("source")}
            />
            {formik.touched.source && formik.errors.source ? <small className='text-danger'>{formik.errors.source} </small> : ""}

          </Col>
          <Col>
            <Form.Label> link to source </Form.Label>
            <Form.Control type="text" placeholder=" if exists" name="sourceUrl" value={formik.values} {...formik.getFieldProps("sourceUrl")}
            />
            {formik.touched.sourceUrl && formik.errors.sourceUrl ? <small className='text-danger'>{formik.errors.sourceUrl} </small> : ""}
          </Col>
        </Row>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                General description
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <div>
                <Row>
                  <Col>
                    <Form.Label>
                      description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name="description"
                      placeholder='description as you can shortly'
                      value={formik.values}
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? <small className='text-danger'>{formik.errors.description} </small> : ""}
                  </Col>
                  <Col className='col-sm-4'>
                    <Form.Label>
                      preparation time
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={3}
                      placeholder='time in minutes'
                      name="prepTimeMin"
                      value={formik.values} {...formik.getFieldProps("prepTimeMin")}
                    />
                    {formik.touched.prepTimeMin && formik.errors.prepTimeMin ? <small className='text-danger'>{formik.errors.prepTimeMin} </small> : ""}

                  </Col>
                </Row>
                <Row>
                  <Row className="container-fluid mx-2">
                    <Col>
                      <Row className="mr-3">Diet type: </Row>
                      <Row>
                        {diets.length &&
                          diets.map((diet) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                label={diet.name}
                                name='diet'
                                checked={diet.id in formik.values.diet || diet.select}
                                value={diet.id || diet["_id"]}
                                onChange={(e) => {
                                  let checked = e.target.checked;
                                  setDiets(diets.map(item => {
                                    diet.select = checked
                                    return item
                                  }))
                                  formik.handleChange(e);
                                }} />
                            );
                          })}
                        {formik.touched.diet && formik.errors.diet ? <small className='text-danger'>{formik.errors.diet} </small> : ""}
                      </Row>
                    </Col>
                    <Col>
                      <Row className="mr-3">Category </Row>
                      <Row>
                        {categories.length &&
                          categories.map((category) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                label={category.name}
                                name='category'
                                checked={category.select}
                                value={category.id || category["_id"]}
                                onChange={(e) => {
                                  let checked = e.target.checked;
                                  setCategories(categories.map(item => {
                                    category.select = checked
                                    return item
                                  }))
                                  formik.handleChange(e);
                                }}
                              />

                            );
                          })}
                        {formik.touched.category && formik.errors.category ? <small className='text-danger'>{formik.errors.category} </small> : ""}
                      </Row>

                    </Col>
                  </Row>
                </Row>
              </div>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Ingredients
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <>
                {instructions.length > 0 &&
                  instructions.map((item, i) => (
                    <div key={i} className='d-flex ingredints mb-1'>
                      <div className='col-sm-2'>{item.quantity}</div>
                      <div className='col-sm-4'>{item.measureUnit || units[item.measureUnit - 1]?.name}</div>
                      <div className='col-sm-4'>{item.ingredient || item.name || ingredients[item.ingredient - 1]?.name}</div>
                      <i class="fas fa-trash text-sm" onClick={() => deleteInstruction(i)}> </i>
                    </div>
                  ))}

                <Row className="small-5 mt-4">
                  <Col className="col-sm-2">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" min={1} name='quantity' onChange={(e) => { changeIngredient(e) }} />
                  </Col>
                  <Col className="col-md-4 mb-3">
                    <Form.Label>Measurement unit </Form.Label>
                    <select onChange={(e) => changeIngredient(e)} name='measureUnit' defaultValue={units[0]?.id}>
                      {units.map((unit, i) => {
                        return (
                          <option key={i} value={unit.id} name={unit.name}>
                            {unit.name}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                  <Col>
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control type="text" name="ingredient" value={formik.values}{...formik.getFieldProps("ingredient")} />
                    {formik.touched.ingredient && formik.errors.ingredient ? <small className='text-danger'>{formik.errors.ingredient} </small> : ""}
                  </Col>
                  <Col >
                    <Button
                      className="md-3  save-btn"
                      onClick={(e) => addToList('ingredients')}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Preparation steps
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <>
                {guide.length > 0 &&
                  guide.map((item, i) => (
                    <div key={i} className='d-flex instruction'>
                      <div className='text-left col-sm-10 '>{item.instruction}</div>
                      <button onClick={() => deleteGuide(i)}
                        className='col-sm-2'>
                        <i class="fas fa-trash text-sm "></i>
                      </button>
                    </div>
                  ))}
                <Row className="d-flex ">
                  <Col className="col-md-10">
                    <Form.Label>instruction</Form.Label>
                    <Form.Control as="input" name='instruction' onChange={(e) => changeGuide(e)} />
                  </Col>
                  <Col className="col-md-2 mb-0">
                    <Button
                      className=" flex-grow-0"
                      onClick={() => addToList('guide')}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Row className="text-left">
          <Button type="submit"  >
            {editMode ? "Update Recipe" : "Add Recipe"}
          </Button>
        </Row>
      </div>
    </Form >
  );
}
export default NewRecipeForm;
