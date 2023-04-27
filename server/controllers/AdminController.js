const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const login = (req, res, next) =>{
    try{
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            res.status(200).send({message:"Success",status:200})
        }else{
            res.status(401).send({message:"Incorrect Information",status:401})
        }
    }catch(err){
        const errors ="server side error"
        res.json({errors, created: false})
    }
}

const getUsers = async(req, res, next) => {
    try{
       const users = await UserModel.find()
       res.status(200).send({message:"Success",status:200,users})
    }catch(err){
        const errors = "Server Side error";
        res.json({errors, created: false})
    }
}

const deleteUser = async(req, res, next) => {
    try{
        const {id} = req.body;
        await UserModel.deleteOne({_id:id})
        const users = await UserModel.find()
        res.status(200).send({message:"Delete Success",status:200,users})
    }catch(err){
        const errors = "Server Side error";
        res.json({errors, created: false})
    }
}

module.exports = {
    login,
    getUsers,
    deleteUser
}