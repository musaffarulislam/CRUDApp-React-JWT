const { register,login,update } = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/')
router.post("/register",register)
router.post("/login",login)
router.post("/update",update)

module.exports = router;