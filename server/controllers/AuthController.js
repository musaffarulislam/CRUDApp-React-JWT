const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const maxDate = 7 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxDate,
  });
};

const handleErrors = (err) =>{
    let errors = { name: "", email: "", phonenumber: "", password: ""};
    if(err.code === 11000){
        errors.email = "Email is already registered";
        return errors;
    }

    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const register = async (req, res, next) => {
  try {
    const { name, email, phonenumber } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.create({
      name,
      email,
      phonenumber,
      password: hashedPassword,
    });
    const token = createToken(user._id);

    res.cookie("jwt",token, {
        withCrdentials :true,
        httpOnly: false,
        maxDate: maxDate*1000,
    });
    res.status(201).json({user:user._id,created:true})
  } catch (err) {
    const errors = handleErrors(err);
    res.json({errors, created: false})
  }
};

const login = async (req, res, next) => {
  try {
      const { email, password} = req.body;
      console.log(email);
        const userdb = await UserModel.findOne({ email: email});
        console.log(userdb);
        if(userdb) {
            bcrypt.compare(password,userdb.password).then((result)=>{
                if(result){
                    const token = createToken(userdb._id);
        
                    res.cookie("jwt",token, {
                        withCrdentials :true,
                        httpOnly: true,
                        maxDate: maxDate*1000,
                    });

                    res.status(200).send({message:"Success",status:200,token,user:userdb})
                }else{                  
                    res.status(401).send({message:"Incorrect Password",status:401})
                }
            })
        }else {        
            res.status(401).send({message:"Incorrect Email",status:401})
        }

      } catch (err) {
        const errors = handleErrors(err);
        res.json({errors, created: false})
      }
};


const update = async (req, res, next) => {
  try {
      const { name, email, phonenumber, userId} = req.body;
      console.log(email);
        await UserModel.updateOne({ _id: userId},{
          $set:{
            name,
            email,
            phonenumber
          }
        });

        const userdb = await UserModel.findOne({ email: email})

        res.status(200).send({message:"Success",status:200,user:userdb})
      } catch (err) {
        const errors = handleErrors(err);
        res.json({errors, created: false})
      }
};

module.exports = {
  register,
  login,
  update,
};
