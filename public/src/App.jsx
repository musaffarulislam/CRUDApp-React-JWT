import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import AdminLogin from './Pages/AdminLogin';
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={token ?<Home/>: <Login/>}></Route>
        <Route exact path='/login' element={!token ?<Login/>: <Home/>}></Route>
        <Route exact path='/register' element={!token ?<Register/>: <Home/>}> </Route>
        <Route exact path="/profile" element={token ? <Profile /> : <Login />} />

        <Route exact path="/admin" element={<Admin/>} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
