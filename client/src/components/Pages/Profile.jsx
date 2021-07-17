import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from '../forms/Login'
import ShowAllRecipes from "../sections/ShowAllRecipes";
import CardItem from "../sections/CardItem";
import Cookies from "js-cookie"
import { Button } from "react-bootstrap";
const { getData, getUserRecipes, getSpecificUser } = require('../DAL/api')


function Profile() {
    const history = useHistory()
    const [editMode, setEditMode] = useState(false)
    return (
        <>
            {editMode && <Login />}
            <Button onClick={() => { setEditMode(true) }}>edit Profile</Button>
        </>

    )
}
export default Profile