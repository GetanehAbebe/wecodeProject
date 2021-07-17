import { useEffect, useState } from "react";
import { Accordion, Card, Button, Form, Col, Row, Table, } from "react-bootstrap";
import useForm from "../utills/useForm";
import validate from "../utills/validateInfo";
import { getData, insertDataToDB, ingredientsOfRecipe, uploadRecipe, getRecipeDetails, updateRecipe } from "../DAL/api";
import { useHistory } from "react-router-dom";
import ErrorMessages from "../utills/ErrorMessages";
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
  const history = useHistory()
  const [categories, setCategories] = useState([]);
  const { handleSubmit, handleChange, values, errors } = useForm(submit, validate);

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
      if (!obj[prop]) return false
    }
    return true
  }

  const addToList = (value) => {
    if (value === 'ingredients') {
      if (checkThefilds(recipeIngredient)) {
        setInstructions([...instructions, recipeIngredient])
      } else {
        alert('please check the fields')
      }
    }
    if (value === 'guide') setGuide([...guide, recipeGuide])
    else return
  }
  const checkErrors = (obj) => {

    for (let prop in obj) {
      if (obj[prop].length > 0) return false
    }
    return true
  }

  const insertDataToForm = (recipe) => {
    values.name = recipe.recipe.name
    values.source = recipe.recipe.source
    values.sourceUrl = recipe.recipe.sourceUrl
    values.description = recipe.recipe.description
    values.isPrivate = !!recipe.recipe.isPrivate
    values.prepTimeMin = recipe.recipe.prepTimeMin
    setImage(recipe.images[0]?.url)
    console.log(recipe.ingredients);
    setGuide(recipe.instructions)
    const arr = []
    for (let x of recipe.category) {
      console.log(x);
      arr.push(String(x.categoryId))
    }
    values.category = arr
    const diets = []
    for (let x of recipe.diet) {

      diets.push(String(x.dietId))
    }
    values.diet = diets;
  }
  async function submit() {
    // if (checkErrors(errors)) {
    const data = new FormData();
    values.guide = guide;
    values.instructions = instructions
    if (recipeId) values.id = recipeId
    data.append("image", image)
    data.append("user", Cookies.get('user'))
    data.append("recipe", JSON.stringify(values))

    values.userId = 14;

    if (!recipeId) {

      const response = await uploadRecipe(data)
    } else {
      console.log('updated');
      
      const update = await updateRecipe(data)
    }
  }
  const changeIngredient = (e) => {
    const { name, value } = e.target;
    setRecipeIngredient({ ...recipeIngredient, [name]: value })
  }

  const changeGuide = (e) => {
    const { name, value } = e.target;
    setRecipeGuide({ ...recipeGuide, [name]: value })
  }

  useEffect(async () => {
    console.log('props', recipeId);
    if (!Cookies.get('user')) history.push('/login')
    const fetchIngredient = await getData('ingredients')
    const fetchDiets = await getData('diets')
    const fetchUnits = await getData('units')
    const fetchCategories = await getData('categories')
    setDiets(fetchDiets);
    setUnits(fetchUnits);
    setIngredients(fetchIngredient);
    setCategories(fetchCategories);
    if (recipeId) {
      setEditMode(true)
      const instruc = await ingredientsOfRecipe(recipeId)
      const formRecipe = await getRecipeDetails(recipeId)
      insertDataToForm(formRecipe)
      console.log("instruc", formRecipe);
      setInstructions(instruc)
    }

  }, []);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data" >
      <div className="form-inner">
        <h1>Adding new recipe</h1>
        <Row className="container">
          <Col className="col-md-3">
            <Form.Label>name </Form.Label>
            <Form.Control type="text" name="name" value={values.name} onChange={handleChange} />
            {errors.name && <ErrorMessages errors={errors.name} />}
          </Col>
          <Col className="col-md-3 mr-4">
            <Row>
              <Form.Label as="Row" column sm={10}>
                view permition
              </Form.Label>
            </Row>
            <Row sm={10}>
              <Form.Check
                type="radio"
                label="public"
                defaultValue={false}
                name="isPrivate"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                value={true}
                label="private"
                name="isPrivate"
                onChange={handleChange}
              />
              {errors.isPrivate && <ErrorMessages errors={errors.isPrivate} />}
            </Row>
          </Col>
          <Col>
            <Form.File
              label="main pic"
              name="image"
              multiple
              DefaultValue={image}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* {errors.image && <ErrorMessages errors={errors.image} />} */}
          </Col>
        </Row>
        <Row className="container-fluid">
          <Form.Label> source</Form.Label>
          {errors.source && <ErrorMessages errors={errors.source} />}
          <Form.Control
            type="text"
            placeholder="recipe source"
            name="source"
            value={values.source}
            onChange={handleChange}
          />
          <Form.Label> link to source </Form.Label>
          <Form.Control
            type="text"
            placeholder=" if exists"
            name="sourceUrl"
            value={values.sourceUrl}
            onChange={handleChange}
          />
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
                <Form.Group
                  className="mb-3 container-fluid"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    The description will appear below the title
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  <Form.Label>
                    prepTime
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="prepTimeMin"
                    value={values.prepTimeMin}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row className="container w-75 m-auto">
                  <Col>
                    <Row className="mr-3">diet type:</Row>
                    <Row>
                      {diets.length &&
                        diets.map((diet) => {
                          return (
                            <Form.Check
                              type="checkbox"
                              label={diet.name}
                              name='diet'
                              value={diet.id}
                              onChange={handleChange} />
                          );
                        })}
                      {errors.diet && <ErrorMessages errors={errors.diet} />}
                    </Row>
                  </Col>
                  <Col>
                    <Row className="mr-3">Suitable for category</Row>
                    <Row>
                      {categories.length &&
                        categories.map((category) => {
                          return (
                            <Form.Check
                              type="checkbox"
                              label={category.name}
                              name='category'
                              value={category.id}
                              onChange={handleChange}
                            //  checked={values.category}
                            />
                          );
                        })}
                      {errors.category && <ErrorMessages errors={errors.category} />}
                    </Row>

                  </Col>
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
                    <div key={i} className='d-flex'>
                      <div className='col-sm-1'>{item.quantity}</div>
                      <div className='col-sm-3'>{units[item.measureUnit - 1].name}</div>
                      <div className='col-sm-3'>{ingredients[item.ingredient - 1].name}</div>
                      <div className='col-sm-4'>{item.note}</div>
                      <i class="fas fa-trash text-sm" onClick={() => deleteInstruction(i)}> </i>
                    </div>
                  ))}

                <Row className="p-5">
                  <Col className="col-sm-2">
                    <Form.Label>quantity</Form.Label>
                    <Form.Control type="number" min={1} name='quantity' onChange={(e) => { changeIngredient(e) }} />
                  </Col>
                  <Col className="col-md-4">
                    <Form.Label>measurement unit</Form.Label>
                    <select onChange={(e) => changeIngredient(e)} name='measureUnit'>
                      <option>---choose </option>
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
                    <Form.Label>Ingredients</Form.Label>
                    <select onChange={(e) => changeIngredient(e)} name='ingredient'>
                      <option>---choose </option>
                      {ingredients.length > 0 && ingredients.map((ingredient, i) => {
                        return (
                          <>
                            <option key={i} value={ingredient.id} name={ingredient.name}>
                              {ingredient.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </Col>
                  <Col className="col-md-2">
                    <Form.Label>notes</Form.Label>
                    <Form.Control as="input" name='note' onChange={(e) => { changeIngredient(e) }} />
                  </Col>
                  <Row >
                    <Col >
                      <Button
                        className="md-6 mt-3"
                        onClick={(e) => addToList('ingredients')}>
                        Save
                      </Button>
                      <Button onClick={() => setInstructions([])}
                        className="md-6 mt-3 ml-3">Clear</Button>
                    </Col>
                  </Row>
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
                    <div key={i} className='d-flex'>
                      <div className='col-sm-5'>{item.number}</div>
                      <div className='col-sm-5'>{item.instruction}</div>
                      <button onClick={() => deleteGuide(i)}
                        className='col-sm-1'>
                        <i class="fas fa-trash text-sm "></i>
                      </button>
                    </div>
                  ))}
                <Row className="d-flex p-5">
                  <Col className="col-md-2">
                    <Form.Label>#</Form.Label>
                    <Form.Control as="input" name='number' onChange={(e) => changeGuide(e)} />
                  </Col>
                  <Col className="col-md-4">
                    <Form.Label>instruction</Form.Label>
                    <Form.Control as="input" name='instruction' onChange={(e) => changeGuide(e)} />
                  </Col>
                  <Col className="col-md-2">
                    <Button
                      className="m-2 flex-grow-0"
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
            {editMode ? "Edit Recipe" : "Add Recipe"}
          </Button>
        </Row>
      </div>
    </Form >
  );
}
export default NewRecipeForm;
