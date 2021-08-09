import { useContext, useEffect, useState } from "react";
import { Row, Form } from "react-bootstrap";
import { getUsers, login, getSpecificUser, sendPutReq } from "../DAL/api";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthApi from "../context/AuthApi";
import { Button } from 'react-bootstrap'
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
        Cookies.set("user", response.id || response["_id"])
        history.push('/')
      }
      else {
        setMessage(response.message);
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

        <Button
          className="btn btn-primary my-2  font-weight-bold"
          onClick={onSubmit}
          type='submit'
        >
          {!isLoged ? "Login" : "edit"}
        </Button>
        {!isLoged && <Link to="/sign-up" className='row-sm-9 m-auto'> Create New Acount </Link>}
      </div>
    </Form>
  );
}
export default Login;
