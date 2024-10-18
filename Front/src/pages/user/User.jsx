import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Account from "../../components/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import "./user.css";

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth.token);


  const getUser = async () => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      dispatch(setUser(data.body));
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }
    getUser();
  }, []);

  return (
    <main className="main bg-dark">
      <Header />
      <Account />
    </main>
  );
}
