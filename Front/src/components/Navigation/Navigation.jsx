import "./Navigation.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/argentBankLogo.webp";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth"; 


export default function Navigation() { 
  // Récupérer les informations de l'utilisateur et le token depuis Redux
  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store.auth.token);
  // Initialisation de dispatch pour Redux et navigation pour React Router
    const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/");
  };

    return (
      /* Logo de l'application */
        <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
  
       
        { // affichage de user et sign out
        token && <div>
        <NavLink to="/User" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
              {" "} {user.userName}
        </NavLink>
        <NavLink to="/" className="main-nav-item"onClick={handleLogout} >
            <i className="fa fa-user-circle"></i>
            {" "} Sign Out
        </NavLink>
        </div>
        }
       
       { /*masquer le user et signout et affiche sign in si le token n'est pas validé */
       !token && <div>
          <NavLink to="/Login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {" "}Sign In
          </NavLink>
        </div>}

      </nav>
    )
    }