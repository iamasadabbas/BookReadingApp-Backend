const users = require('../models/usersModel');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRound = 10;
const validator = require('validator')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors= require('cors') 
const router=express.Router();
router.use(express.json());
router.use(cookieParser())
router.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST'],
    credentials:true,
}))
const secret_key = process.env.SECRET_KEY

const postUser = async (req, resp) => {
    let data = new users(req.body);
    try {
        if (!validator.isEmail(data.email) || !validator.isStrongPassword(data.password)) {
            return resp.send({ status: 400, message: 'invalid email or password' })
        }
        const hashedPassword = await bcrypt.hash(data.password, saltRound)
        data.password = hashedPassword;
        let result = await data.save();
        return resp.send({ status: 200, message: 'Login Successfully' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return resp.send({ status: 409, message: 'Email already exists' }); // Return 409 Conflict status
        } else {
            console.error('MongoDB Error:', error);
            return resp.status(500).send({ message: 'Internal Server Error' }); // Return 500 Internal Server Error status
        }
    }
}

const getAllUsers = async (req, resp) => {
    let result = await users.find();
    return resp.send(result)
}
const updateUser = async (req, resp) => {
    try {
        const { email, password } = req.body;
        
        // Hash the new password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRound);
            req.body.password = hashedPassword;
        }

        let data = await users.updateOne({ id: req.params._id }, { $set: req.body });

        if (data.modifiedCount === 1) {
            return resp.status(200).send({ message: 'User data updated successfully' });
        } else {
            
            return resp.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return resp.status(500).send({ message: 'An error occurred while updating user data' });
    }
}


const deleteUser = async (req, resp) => {
    let result = await users.deleteOne(req.params._id);
    return resp.send(result)
}
const loginUser = async (req, resp) => {
    try {
        const user = await users.findOne({ username: req.body.username });
        if (user == null) {
            resp.status(500).json({ message: 'User not found' });
        } else {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: user._id.toString(),role:user.role }, secret_key, { expiresIn: '3d' });
                // Set token in a cookie
                resp.cookie('token', token, { maxAge: 36000000, httpOnly: true,secure:false, path: '/' });
                // resp.cookie('userId', user._id, { maxAge: 36000000, httpOnly: true,secure:false, path: '/' });
                // localStorage.setItem('userId', user._id);
                resp.status(200).send({ token, userId: user._id.toString(),role:user.role, status: 200 });
            } else {
                resp.status(201).json({ message: 'Invalid Username or Password' });
            }
        }
    } catch (error) {
        console.log("Error:", error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
}

const logOut=async(req,resp) => {
    try {
        resp.clearCookie('token', { maxAge: 1});
        console.log('logout successful');
        resp.send({status:200,message:'success'});

    } catch (error) {
        console.error(error)
    }
}

module.exports = { postUser,logOut, getAllUsers, updateUser, deleteUser, loginUser }