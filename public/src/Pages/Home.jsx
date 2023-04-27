import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/userSlice";

export default function Home() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (

    <div className="container">
      <h2>CRUD APP</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="phonenumber">Phonenumber</label>
          <input
            type="number"
            name="phonenumber"
            value={user.phonenumber}
            readOnly
          />
        </div>
        <button style={{backgroundColor: 'red'}} onClick={()=>navigate('/profile')}>Profile</button>
        <button onClick={handleLogout}>Sign Out</button>
      </form>
    </div>
  );
}
