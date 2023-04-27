const { deleteUser,login,getUsers } = require('../controllers/AdminController');

const router = require('express').Router();

router.get('/')
router.post('/login', login);
router.post('/deleteUser', deleteUser);
router.get('/getUsers',getUsers);

module.exports = router;