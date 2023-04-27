import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from '../redux/userSlice';
import { setLogout } from "../redux/userSlice";
import axios from '../axios';

import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phonenumber: user.phonenumber,
  });

  const generateError = (err) => toast.error(err, {
    position: "top-right"
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} =  await axios.post('/update',{
            ...values,
            userId: user._id,
        },{
          withCredentials:true
        })
        if(data){
          if(data.errors){
            generateError("Enter Correct values");
          }else{
            (
              setLogin({
                user: data.user,
                token: token
              })
            );
            navigate('/')
          }
        }
    }catch(err){
        console.log(err);
    }
  };

  return (

    <div className="container-red">
      <h2>Profile</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phonenumber">Phonenumber</label>
          <input
            type="number"
            name="phonenumber"
            value={user.phonenumber}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Update</button>
        <button style={{backgroundColor: 'red'}} onClick={()=>navigate('/')}>Home</button>
        <button onClick={handleLogout}>Sign Out</button>
      </form>
        <ToastContainer />
    </div>
  );
}
