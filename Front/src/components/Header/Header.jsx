import { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../redux/slices/user";

 // Composant pour gérer la modification du nom d'utilisateur
export default function Username() {
  const [isEditing, setIsEditing] = useState(false);// État pour activer/désactiver le mode édition
  const [newUserName, setNewUserName] = useState("");// État pour stocker le nouveau username
  const user = useSelector((state) => state.user);// Récupérer les informations de user depuis Redux
  const token = useSelector((state) => state.auth.token)// Récupérer le token d'authentification depuis Redux
  const dispatch = useDispatch();

    // Activer le mode édition
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(user.userName);
  };

   // Annuler la modification et quitter le mode édition
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Enregistrer le nouveau username  via l'API et mettre à jour Redux
  const handleSaveClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Authentifier la requête avec le token
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({userName: newUserName}) // Envoyer le nouveau nom d'utilisateur
    })

    const data = await response.json()

    // Mettre à jour le store Redux si la requête est réussie
    if (response.status === 200) {
      dispatch(updateUserName(data.body.userName));
    }
    setIsEditing(false); // Désactiver le mode édition
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