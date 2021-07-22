import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from '../forms/Login'
import ShowAllRecipes from "../sections/ShowAllRecipes";
import CardItem from "../sections/CardItem";
import Cookies from "js-cookie"
import FormikRegister from '../forms/FormikRegister'
import { Button } from "react-bootstrap";
import RegisterForm from "../forms/RegisterForm";
const { getData, getUserRecipes, getSpecificUser } = require('../DAL/api')
function Profile() {
    const history = useHistory()
    const [editMode, setEditMode] = useState(false)
   
    return (
        <div>
           
            <RegisterForm editUser={true} />
         
        </div>
    )
}
export default Profile