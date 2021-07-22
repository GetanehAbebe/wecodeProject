import { useEffect, useState } from 'react'
import { getData } from '../DAL/api'
import { Multiselect } from 'multiselect-react-dropdown'
import { Row, Form, FormGroup, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import ReactPaginate from 'react-paginate'
import './Gallery.css'
const Cookies = require('js-cookie')

const Search = () => {
    const [recipes, setRecipes] = useState([])
    const [serchRecipes, setSearchRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [diets, setDiets] = useState([])
    const [selectedDiets, setSelectedDiets] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedcategories, setSelectedcategories] = useState([])
    const [recipeText, setRecipeText] = useState('')
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(async () => {
        const getAllRecipes = await getData('recipes')
        const getIngredients = await getData('ingredients')
        const getCategories = await getData('categories')
        const getDiets = await getData('diets')
        console.log(getAllRecipes);
        setRecipes(getAllRecipes)
        setSearchRecipes(getAllRecipes)
        setIngredients(getIngredients)
        setCategories(getCategories)
        setDiets(getDiets)
    }, [])



    const getResults = () => {
        let result = ''
        result = serchRecipes.filter(item => {
            // console.log(item, recipeText);
            return (item.name).toLowerCase().includes(recipeText)
        })

        if (selectedcategories.length) result = result.filter(item => {
            for (const prop of selectedcategories) {
                console.log('selected', selectedcategories);
                for (let cat of item.categories) {
                    if (prop.name === cat.name) return true

                }
            }
        })
        if (selectedDiets.length) result = result.filter(item => {
            for (const prop of selectedDiets) {
                console.log('selected', selectedDiets);
                for (let cat of item.diets) {
                    if (prop.name === cat.name) return true

                }
                // return false
            }
        })
        if (selectedIngredients.length) result = result.filter(item => {
            for (const prop of selectedIngredients) {
                console.log('selected', selectedIngredients);
                for (let cat of item.ingredients) {
                    if (prop.name === cat.name) return true
                }
                // return false
            }
        })
        console.log(result);
        return result
    }

    useEffect(() => {
        let res = getResults();
        if (res.length < 5) setPageNumber(0)
        setRecipes(res)
    }, [selectedcategories, recipeText, selectedDiets, selectedIngredients])

    const changeIng = (data) => {
        setSelectedIngredients(data)
    }
    const changeCat = (data) => {
        console.log(selectedcategories);
        setSelectedcategories(data)
    }
    const changeDiet = (data) => {
        console.log(selectedDiets);
        setSelectedDiets(data)
    }
    const onRemove = (data) => {
        setSelectedcategories(data)
    }
    const onRemoveDiets = (data) => {
        setSelectedDiets(data)
    }
    const onRemoveIngredients = (data) => {

        setSelectedIngredients(data)
    }

    const changePage = ({ selected }) => {
        if (recipes.length < 5) setPageNumber(0);
        else setPageNumber(selected);
    }
    const pageCount = Math.ceil(recipes.length / 5)
    return <>
        <h4 className='mt-5'>find recipe</h4>
        <div className='d-flex search-gallery'>
            <div className='d-flex  flex-column search-recipe justufy-content-center'>
                <h1>search </h1>
                <div>
                    <Form.Group className="search-wrapper" controlId="formBasicEmail">
                        <Form.Label>recipe name</Form.Label>
                        <Form.Control
                            value={recipeText}
                            onChange={(e) => {
                                console.log(recipeText)
                                setRecipeText(e.target.value);
                            }}
                            placeholder="search recipe" />
                    </Form.Group>
                </div>
                <div>
                    <Form.Label>Ingredients</Form.Label>
                    {ingredients.length && <Multiselect options={ingredients}
                        displayValue={'name'} onSelect={changeIng}
                        placeholder='search ingredient'
                        selectedValues={selectedIngredients}
                        onRemove={onRemoveIngredients}
                    />}
                </div>
                <div>
                    <Form.Label>Category</Form.Label>
                    {categories.length && <Multiselect
                        options={categories}
                        onSelect={changeCat}
                        displayValue={'name'}
                        placeholder='category'
                        onRemove={onRemove}
                        selectedValues={selectedcategories} />}
                </div>
                <div>
                    <Form.Label>diet types</Form.Label>
                    {diets.length && <Multiselect options={diets}
                        onSelect={changeDiet}
                        displayValue={'name'}
                        placeholder='diet type'
                        selectedValues={selectedDiets}
                        onRemove={onRemoveDiets}
                    />}

                </div>
            </div>
            <div className='container-fluid justify-content-between '>
                <div>
                    {recipes.length > 0 && recipes.slice(pageNumber * 5, (pageNumber + 1) * 5).map((recipe, i) => (
                        <div class="recipe-card recipe" key={i}>
                            <Link to={`products/${recipe.id}`}>
                                <div class="image">
                                    <img src={recipe.images[0] ? `http://localhost:3200/${recipe.images[0].url} ` : 'https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                                    <div >
                                        <p className='text-dark'>{recipe.name}</p>
                                        <ul class="media">
                                            <li><i class="fa fa-clock-o"></i> {recipe.prepTimeMin} <i class="far fa-clock"></i></li>
                                            <li><i class="fa fa-eye"></i> {recipe.views}</li>
                                            <li>  <i class="far fa-calendar-alt"></i> {(recipe.createdAt).slice(5, 10).split('-').reverse().join('-')}</li>

                                        </ul>
                                    </div>
                                </div>


                            </Link>
                        </div>

                    ))
                    }
                </div>
                <div>

                </div>

            </div>

        </div>
        < ReactPaginate previousLabel={<i class="fas fa-arrow-left"></i>}
            nextLabel={<i class="fas fa-arrow-right"></i>}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"} />
    </>


}
export default Search;