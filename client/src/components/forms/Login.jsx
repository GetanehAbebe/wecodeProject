import { useContext, useEffect, useState } from "react";
import { Row, Form } from "react-bootstrap";
import validateInfo from "../utills/validateInfo";
import { getUsers, login, getSpecificUser, sendPutReq } from "../DAL/api";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthApi from "../context/AuthApi";

import Cookies from 'js-cookie'
function Login() {
  const Auth = useContext(AuthApi)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("");
  const [isLoged, setIsLoged] = useState(false);
  const history = useHistory()


  function changeInfo(e) {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLoged) {
      const response = await login(email, password)
      console.log('response', response);
      if (!response.message) {
        console.log('getaneh', response);
        console.log('user response', response);
        Auth.setAuth(true)
        Cookies.set("user", response.id)
        history.push('/profile')
      }
      else {
        setMessage(response.message);
      }
    }
    if (isLoged) {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        setErrors({ ...errors, password: 'Invalid pssword' })
      } else {
        setErrors({ ...errors, password: null })
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrors({ ...errors, email: 'inValid email' })
      } else {
        setErrors({ ...errors, email: null })
      }
      if (!errors.email && !errors.password) {
        const id = Cookies.get("user")
        console.log(email, password, id);
        console.log(errors);
        sendPutReq(email, password, id)
      }
    }

  }
  const userDetails = async () => {
    const id = Cookies.get("user")
    if (id) {
      setIsLoged(true);
      Auth.setAuth(true)
      const response = await getSpecificUser(id)
      setEmail(response.email);
      setPassword(response.password);
    }
  }
  useEffect(async () => {
    return userDetails()
  }, [])

  return (
    <Form className="form-login" onSubmit={onSubmit}>
      <div className="form-inner my-5 ">
        <h1>{isLoged ? "Details" : "Login"}</h1>
        <label htmlFor="email" className="d-block">
          Email
        </label>
        {message && <small>{message}</small>}
        <input
          id="email"
          name="email"
          type="text"
          className="form-control"
          onChange={(e) => {
            changeInfo(e);
          }}
          defaultValue={email}
        />
        {errors.email && <li>{errors.email}</li>}
        <label htmlFor="email">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          onChange={(e) => {
            changeInfo(e);
          }}
          aria-describedby="emailHelp"
          defaultValue={password}
        />
        {errors.password && <li>{errors.password}</li>}
        <Row>
          <button
            className="btn btn-primary my-2 text-right font-weight-bold "
            onClick={onSubmit}
            type='submit'
          >
            {!isLoged ? "Login" : "edit"}
          </button>
          <div className="d-flex m-auto">
            {!isLoged && <Link to="/sign-up" className='row-sm-9'> Create New Acount </Link>}
          </div>
        </Row>
      </div>
    </Form>
  );
}
export default Login;
