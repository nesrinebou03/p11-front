import { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../redux/slices/user";

export default function Buton() {
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(user.userName);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userName: newUserName})
    })

    const data = await response.json()

    if (response.status === 200) {
      dispatch(updateUserName(data.body.userName));
    }
    setIsEditing(false);
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        Tony Jarvis!
      </h1>
      {!isEditing ? (
        <button className="edit-button" onClick={handleEditClick}>
          Edit Name
        </button>
      ) : (
        <div className="edit-form">
          <h2>Edit user info</h2>
          <form onSubmit={handleSaveClick}>
            <div className="input-wrapper">
              <label htmlFor="username">User name:</label>
              <input type="text" id="username" defaultValue={user.userName}
               onChange={(e) => setNewUserName(e.target.value)}  />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                defaultValue={user.firstName}
                disabled
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                defaultValue={user.lastName}
                disabled
              />
            </div>
            <div className="button-wrapper">
              <button type="submit" className="save-button">
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}