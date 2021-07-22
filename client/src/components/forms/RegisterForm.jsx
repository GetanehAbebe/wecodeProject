import React, { useEffect, useState } from "react";
import "./registerform.css";
import { Link, useHistory } from "react-router-dom";
import { Form, Col, Button, Row } from "react-bootstrap";
import InputCreator from "./InputCreator";

import { getData, insertDataToDB, appendUser, getSpecificUser, updateUser } from "../DAL/api";
import * as Yup from 'yup'
import { useFormik } from "formik";
const Cookies = require('js-cookie')
const RegisterForm = ({ recipe, editUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [diets, setDiets] = useState([]);
  const [message, setMessage] = useState('')
  const history = useHistory()




  const insertToForm = (user) => {
    console.log('user', user);
    const email = user.email;
    console.log(email);
    formik.values.firstName = user.firstName;
    formik.values.lastName = user.lastName;
    formik.values.email = user.email;
    formik.values.password = user.password;
    formik.values.confirmPassword = user.password;
    const arr = []
    user.favorites.map(item => {
      arr.push(item.DietId)
    })
    formik.values.diet = arr;

  }

  useEffect(async () => {
    if (editUser) {
      const id = Cookies.get("user")
      setEditMode(true);
      const getUser = await getSpecificUser(id)
      console.log(getUser);
      insertToForm(getUser)

    }

    const fetchDiets = await getData('diets')
    setDiets(fetchDiets.map(item => {
      return {
        id: ''+item.id,
        name: item.name,
        select: formik.values.diet.includes(item.id)
      }
    }));
  }, []);


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      diet: [],
      confirmPassword: '',

    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(3),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 charaters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
      diet: Yup.array().required('required')
        .min(2, 'must check 2 types')
    })
    ,

    onSubmit: async (values) => {
      // const res = await insertDataToDB('users', formik.values);

      const data = new FormData();
      formik.values.id = Cookies.get("user");
      if (!editUser) {
        const response = await appendUser(values)
        history.push('/login')
      } else {

        const update = await updateUser(values)
        setMessage('updated')
      }

    },

  })
  console.log(formik.values);
  console.log(diets);



  return (
    <>
      <Form  onSubmit={formik.handleSubmit}>
        <div className="form-inner">
          <Form.Row className="m-auto text-center">
            <h1 className="text-center">{editMode ? "Update Profile" : "Registration Page"}</h1>

          </Form.Row>
          {<small>{message}</small>}
          <hr />
          <Form.Group>
            <InputCreator
              title="First name"
              type="text"
              required="true"
              value={formik.values.firstName}
              placeholder="First Name"
              sign={<i class="fas fa-user"></i>}
              onChange={formik.handleChange}
              name="firstName"
            />
            {formik.touched.firstName && formik.errors.firstName ? <small className='text-danger'>{formik.errors.firstName} </small> : ""}

          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Last name"
              type="text"
              required="true"
              value={formik.values.lastName}
              placeholder="last Name"
              sign={<i class="fas fa-user"></i>}
              onChange={formik.handleChange}
              name="lastName"
            />
            {formik.touched.lastName && formik.errors.lastName ? <small className='text-danger'>{formik.errors.lastName} </small> : ""}
          </Form.Group>
          <Form.Group controlId="formGridPassword">
            <InputCreator
              title="Email"
              type="email"
              value={formik.values.email}
              required="true"
              onChange={formik.handleChange}
              placeholder="Email"
              sign={<i class="fas fa-mail-bulk"></i>}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? <small className='text-danger'>{formik.errors.email} </small> : ""}
          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Password"
              type="password"
              required="true"
              value={formik.values.password}
              placeholder="password"
              sign={<i class="fas fa-mail-bulk"></i>}
              onChange={formik.handleChange}
              name="password"
             
            />
            {formik.touched.password && formik.errors.password ? <small className='text-danger'>{formik.errors.password} </small> : ""}

          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Confirm password"
              type="password"
              required="true"
              value={formik.values.confirmPassword}
              placeholder=""
              sign={<i class="fas fa-mail-bulk"></i>}
              onChange={formik.handleChange}
              name="confirmPassword"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <small className='text-danger'>{formik.errors.confirmPassword} </small> : ""}

          </Form.Group>
          <Form.Group>
            <Row>
              {/* <Col className='col-sm-2'>
                <label className='text-left d-block'>Favorite diet</label>
              </Col> */}
              {/* <Col className="d-flex flex-row flex-wrap col-sm-10 justify-content-center">
                {diets.length &&
                  diets.map((diet) => {
                    return (
                      <Form.Check
                        type="checkbox"
                        label={diet.name}
                        name={'diet'}
                        value={''+diet.id}
                        checked={diet.select}
                        onChange={(e) => {
                          let checked = e.target.checked;
                          setDiets(diets.map(item => {
                            diet.select = checked;
                            return item
                          }))
                          formik.handleChange(e);
                        }}
                      //  {...formik.getFieldProps("diet")}
                      />
                    );
                  })}
                {formik.touched.diet && formik.errors.diet ? <small className='text-danger'>{formik.errors.diet} </small> : ""}

              </Col> */}
            </Row>
          </Form.Group>
          {
            <Button type="submit" id="submit" >
              {editMode ? "update" : "sign-up"}
            </Button>
          }
          {!editMode && <Link to="/login">Have an acount?login</Link>}
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
