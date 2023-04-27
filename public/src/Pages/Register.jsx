import React, { useState } from "react";
import {  Link , useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import axios from '../axios';

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phonenumber: null,
    password: "",
  });

  const generateError = (err) => toast.error(err, {
    position: "top-center"
  })

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} =  await axios.post('/register',{
            ...values,
        },{
          withCredentials:true
        })
        if(data){
          if(data.errors){
            generateError("Enter Correct values");
          }else{
            navigate('/login')
          }
        }
    }catch(err){
        console.log(err);
    }
  };
  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
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
            placeholder="Email"
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
            placeholder="Phonenumber"
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
        <button type="submit">Submit</button>
        <span>
          Already have an acoount? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
