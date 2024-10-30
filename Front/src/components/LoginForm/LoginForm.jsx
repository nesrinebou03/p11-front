import { useState } from "react";
import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

/*Formulaire de connexion utilisateur */
export default function LoginForm() {
 // État initial des champs du formulaire
  const [formData, setFormData] = useState({
    email: "tony@stark.com",
    password: "password123",
  });
   // Gestion des erreurs de connexion
  const [error, setError] = useState(false);
  // Initialisation de dispatch pour Redux et navigation pour React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
 // Mise à jour des champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
// Soumission du formulaire et gestion de la connexion
  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response)
    
    const data = await response.json();
    if (response.status !== 200) {
      return setError(true)
    }
// Connexion réussie sauvegarde du token et navigation vers page User
    setError(false);
    dispatch(setToken(data.body.token));
    navigate("/user");
    } 
  return (
        // Structure du formulaire de connexion
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      
      {error && <p className="error">Invalid email or password</p>}
      <form onSubmit={handleLogin}>
        
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
          
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
      
      </form>
    </section>
  )
}
