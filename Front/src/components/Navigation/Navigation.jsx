import "./Navigation.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/argentBankLogo.webp";
import {useNavigate} from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth"; 



export default function Navigation() { 
  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store.auth.token);
    const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = () => {
    dispatch(logout()); 
    navigate("/");
  };

    return (
        <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {
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
       {!token && <div>
          <NavLink to="/Login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {" "}Sign In
          </NavLink>
        </div>}

      </nav>
    )
    }