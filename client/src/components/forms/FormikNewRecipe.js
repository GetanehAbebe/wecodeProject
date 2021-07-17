import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import InputCreator from "./InputCreator";
import validate from "../utills/validateInfo";
import useForm from "../utills/useForm";
import ErrorMessages from "../utills/ErrorMessages";
import { FormControl, FormCheck } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import { getData, insertDataToDB } from "../DAL/api";
import * as Yup from 'yup';
const axios = require('axios')
const FormikNewRecipe = ({ recipe, editUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [diets, setDiets] = useState(null);
    const [categories, setcategories] = useState(null);


    const [chechboxOption, setCheckboxOption] = useState([])
    const history = useHistory()

    useEffect(async () => {
        if (recipe) setEditMode(true);
        const options = []
        const fetchDiets = await getData('diets')
        const fetchCategories = await getData('categories')
        setDiets(fetchDiets);
        setcategories(fetchCategories);

        for (let prop of fetchDiets) {
            console.log(prop);

            let obj = { key: prop.name, value: prop.id }
            options.push(obj)
        }
        setCheckboxOption(options)

    }, []);
    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        image: Yup.string()

            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
        diet: Yup.array().required('required')
            .min(2, 'must check 2 types'),
        category: Yup.array().required('required')
            .min(2, 'must check 2 types')

    })

    return (<Formik
        initialValues={{
            name: '',
            image: '',
            email: '',
            password: '',
            confirmPassword: '',
            diet: [],
            category: []
        }}
        validationSchema={validate}
        onSubmit={async (values) => {

            const response = await axios.post('http://localhost:3200/users', values)
            console.log(response);
            // insertDataToDB('users', values).then(res => alert(res))
            alert(response);
            // history.push('/login')
            // console.log(res);
            // setMessages(res)
            // if (editMode) {
            //   editUser(values);
            // }


        }}>
        {formik => (
            <div className="form-inner">
                <h1 className="my-4 font-weight-bold .display-4">Add Recipe</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <TextField label="Name" name="name" type="text" />
                    <TextField label="Image" name="lastName" type="file" />
                    <TextField label="source" name="source" type="text" />
                    <TextField label="source Link" name="sourceUrl" type="text" />
                    <TextField label="description" name="description" type="textarea" />
                    <div className='d-flex'>
                        <p className='col-sm-3 text-left'>Favorites</p>{diets && diets.map((diet, i) => {
                            return (<label key={i}>
                                <Field type="checkbox" name="diet" value={'' + diet.id} className='mx-2' />
                                {diet.name}
                            </label>
                            )
                        })}
                    </div>
                    <div className='d-flex'>
                        <p className='col-sm-3 text-left'>categories</p>{categories && categories.map((diet, i) => {
                            return (<label key={i}>
                                <Field type="checkbox" name="category" value={'' + diet.id} className='m-2' />
                                {diet.name}
                            </label>
                            )
                        })}
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field type="radio" name="view Permitions" value="true" />
                            public
                        </label>
                        <label>
                            <Field type="radio" name="view Permitions" value='false' />
                            private
                        </label>
                    </div>
                    <ErrorMessage name='checkbox' />
                    <button className="btn btn-dark mt-3" type="submit" onClick={formik.onSubmit}>Register</button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                </Form>
            </div>
        )}
    </Formik>
    )
}
export default FormikNewRecipe
