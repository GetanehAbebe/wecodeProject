import React, { useEffect, useState } from "react";
import "./registerform.css";
import { Link, useHistory } from "react-router-dom";
import { Form, Col, Button, Row } from "react-bootstrap";
import InputCreator from "./InputCreator";
import validate from "../utills/validateInfo";
import useForm from "../utills/useForm";
import ErrorMessages from "../utills/ErrorMessages";
import { getData, insertDataToDB } from "../DAL/api";
const RegisterForm = ({ recipe, editUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [diets, setDiets] = useState([]);
  const [meesages, setMessages] = useState('')
  const history = useHistory()
  useEffect(async () => {
    if (recipe) setEditMode(true);
    const fetchDiets = await getData('diets')
    console.log(fetchDiets);
    setDiets(fetchDiets);
  }, []);


  const { handleSubmit, handleChange, values, errors } = useForm(
    submit,
    validate
  );


  function objectIsEmpty(obj) {
    for (var prop in obj) {
      console.log(obj[prop]);
      if (!!obj[prop])

        return false;
    }

    return true;
  }

  async function submit(e) {
    // console.log(objectIsEmpty(errors));
    // if (!objectIsEmpty(errors)) {
    const res = await insertDataToDB('users', values)
    console.log(res);
    // console.log(res);
    // history.push('/login')
    console.log(res);
    setMessages(res)
    if (editMode) {
      editUser(values);
    }
  }

  return (
    <>
      <Form dir="rtl" onSubmit={handleSubmit}>
        <div className="form-inner">
          <Form.Row className="m-auto rtl">
            <h1 className="text-center">Registration page</h1>
          </Form.Row>
          <hr />
          <Form.Group>
            <InputCreator
              title="First name"
              type="text"
              required="true"
              value={values.firstName}
              placeholder="First Name"
              sign={<i class="fas fa-user"></i>}
              onChange={handleChange}
              name="firstName"
              error={errors.firstname}
            />
            {errors.firstName && <ErrorMessages errors={errors.firstName} />}
          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Last name"
              type="text"
              required="true"
              value={values.lastName}
              placeholder="last Name"
              sign={<i class="fas fa-user"></i>}
              onChange={handleChange}
              name="lastName"
              error={errors.lastName}
            />
            {errors.lastName && <ErrorMessages errors={errors.lastName} />}
          </Form.Group>
          <Form.Group controlId="formGridPassword">
            <InputCreator
              title="Email"
              type="email"
              required="true"
              value={values.email}
              placeholder="Email"
              sign={<i class="fas fa-mail-bulk"></i>}
              onChange={handleChange}
              name="email"
              error={errors.email}
            />
            {errors.email && <ErrorMessages errors={errors.email} />}
          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Password"
              type="password"
              required="true"
              value={values.password}
              placeholder="password"
              sign={<i class="fas fa-mail-bulk"></i>}
              onChange={handleChange}
              name="password"
              error={errors.password}
              note="Minimum password requirements: at least a digit, 
              lowercase and uppercase letter in English. And no less than 8 characters"
            />
            {errors.password && <ErrorMessages errors={errors.password} />}
          </Form.Group>
          <Form.Group>
            <InputCreator
              title="Confirm password"
              type="password"
              required="true"
              value={values.password2}
              placeholder=""
              sign={<i class="fas fa-mail-bulk"></i>}
              onChange={handleChange}
              name="password2"
              error={errors.password2}
              note="The content of the field will be the same as the content typed for the password"
            />
            {errors.password2 && <ErrorMessages errors={errors.password2} />}
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <label className='form-label text-left d-block'>Favorite diet</label>
              </Col>
              <Col className="d-flex flex-row flex-wrap col-sm-10">
                {diets.length &&
                  diets.map((diet) => {
                    return (
                      <Form.Check
                        type="checkbox"
                        label={diet.name}
                        name={'diet'}
                        value={diet.id}
                        onChange={handleChange}
                      />
                    );
                  })}
                {errors.diet && <ErrorMessages errors={errors.diet} />}
              </Col>
            </Row>
          </Form.Group>
          {
            <Button type="submit" id="submit" onClick={handleSubmit}>
              {editMode ? "update" : "sign-up"}
            </Button>
          }
          <Link to="/login">have an acount?login</Link>
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
