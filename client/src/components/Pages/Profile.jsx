import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";
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