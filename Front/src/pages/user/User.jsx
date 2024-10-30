import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Account from "../../components/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import "./user.css";

// Composant pour la page user
export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth.token);

//récupérer les informations de user via l'API
  const getUser = async () => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
// Mettre à jour les informations de user si la requête réussit
    if (response.status === 200) {
      dispatch(setUser(data.body));
    }
  };

  /* Utilisation de useEffect pour vérifier l'authentification
   et récupérer les données utilisateur*/
  useEffect(() => {
    if (!token) {
      return navigate('/login')// Rediriger vers la page de connexion si non connecté
    }
    getUser();// Récupérer les données utilisateur si connecté
  }, []);

  return (
     // Structure de la page utilisateur avec Header et Account
    <main className="main bg-dark">
      <Header />
      <Account />
    </main>
  );
}
