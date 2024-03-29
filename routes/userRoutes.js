const express = require('express');
const router = express.Router();
// import Cookies from 'js-cookie';
const userController = require('../controllers/usersControllers');
const verifyToken = require('../utils/verifyToken')

router.post('/postuser', userController.postUser);
router.get('/logout', userController.logOut);
router.get('/getallusers',verifyToken, userController.getAllUsers);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);
router.post('/loginuser',userController.loginUser);

module.exports = router;