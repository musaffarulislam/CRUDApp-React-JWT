import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, useAsyncValue, useNavigate } from "react-router-dom";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "../axios";
import { getUsers } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function Admin() {
  const admin = useSelector((state) => state.auth.admin);
  const users = useSelector((state) => state.auth.allUsers);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(users);
  useEffect(async () => {
    const { data } = await axios.get("/admin/getUsers");
    dispatch(
      getUsers({
        users: data.users,
      })
    );
  }, []);

  const deleteUser = async (id) =>{
    const { data } = await axios.post("/admin/deleteUser",{id})
    dispatch(
      getUsers({
        users: data.users,
      })
    );
  }

  return (
    <div className="card-body">
      <div className="table-responsive">
        <table className="table boarder" id="dataTable" width="100%" cellspacing="0">
          <thead className="thead-dark">
            <tr>
              <th> Name</th>
              <th> Email</th>
              <th> Phone</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>
                  <div className="flex gap-5">
                    {/* <span>
                      <MdOutlineModeEditOutline className=" cursor-pointer hover:text-amber-600" />
                    </span> */}
                    <span>
                      <MdOutlineDelete className="cursor-pointer hover:text-red-600"  onClick={()=>{deleteUser(user._id)}}/>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
