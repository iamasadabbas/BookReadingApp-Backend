const express = require('express');
const roles=require('../models/rolesModel')


const addRoles = async (req, resp) => {
    try {
        let data = new roles(req.body);
        let result = await data.save();
        if(result){

            return resp.send({ status: 200, message: 'Role Added Successfully' });
        }
    } catch (error) {
        
            console.error('MongoDB Error:', error);
            return resp.status(500).send({ message: 'Internal Server Error' });
        }
    
}

const getAllRole = async (req, resp) => {
    let result = await roles.find();
    return resp.send({status:200,result})
}
const getRoleIdByRoleName = async (req, resp) => {
    const data=req.params.role;
    let result = await roles.find({role:data});
    // const roleId=result._id
    // console.log();
    // console.log(roleId);

    return resp.send(result)
}

module.exports = { addRoles,getAllRole,getRoleIdByRoleName }

