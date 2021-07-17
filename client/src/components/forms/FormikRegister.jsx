import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// import { Form, Col, Button, Row } from "react-bootstrap";
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
const FormikRegister = ({ recipe, editUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [diets, setDiets] = useState(null);
    const [chechboxOption, setCheckboxOption] = useState([])
    const history = useHistory()

    useEffect(async () => {
        if (recipe) setEditMode(true);
        const options = []
        const fetchDiets = await getData('diets')
        setDiets(fetchDiets);

        for (let prop of fetchDiets) {
            console.log(prop);

            let obj = { key: prop.name, value: prop.id }
            options.push(obj)
        }
        setCheckboxOption(options)

    }, []);
    const validate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
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
        checkbox: Yup.array().required('required')
            .min(2, 'must check 2 types')
    })

    return (<Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            checkbox: []
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
                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <TextField label="First Name" name="firstName" type="text" />
                    <TextField label="last Name" name="lastName" type="text" />
                    <TextField label="Email" name="email" type="email" />
                    <TextField label="password" name="password" type="password" />
                    <TextField label="Confirm Password" name="confirmPassword" type="password" />
                    <div className='d-flex'>
                        <p className='col-sm-3 text-left'>Favorites</p>{diets && diets.map((diet, i) => {
                            return (<label key={i}>
                                <Field type="checkbox" name="checkbox" value={'' + diet.id} />
                                {diet.name}
                            </label>
                            )
                        })}

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
export default FormikRegister