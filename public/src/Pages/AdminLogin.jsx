import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from '../axios';
import { setLogin } from '../redux/userSlice';
import { useDispatch } from "react-redux";

export default function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const generateError = (err) => toast.error(err, {
    position: "top-right"
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try{
      const {data} =  await axios.post('/admin/login',{
          ...values,
      },{
        withCredentials:true
      })
      if(data){
        if(data.errors){
          generateError(data.errors);
        }else if(data.status===401){
          generateError(data.message);
        }else {
          navigate('/admin')
        }
      }
    }catch(err){
        console.log(err);
    }
  };
  return (
    <div className="container-red">
      <h2>Admin Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button style={{backgroundColor: 'rgb(255, 47, 47)'}} type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
