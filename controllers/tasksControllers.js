const express = require('express');
const tasks=require('../models/tasksModel')


const addTasks = async (req, resp) => {
    try {
        let data = new tasks(req.body);
        let result = await data.save();
        if(result){

            return resp.send({ status: 200, message: 'Task Added Successfully' });
        }
    } catch (error) {
        
            console.error('MongoDB Error:', error);
            return resp.status(500).send({ message: 'Internal Server Error' });
        }
    
}

const getAllTask = async (req, resp) => {
    let result = await tasks.find();
    return resp.send({status:200,result})
}
const getTaskByTaskName = async (req, resp) => {
    let result = await tasks.find({task:req.params.task});
    try {
        
        const id=result[0]._id
        return resp.send({status:200,id})
    } catch (error) {
        console.log(error);
    }
}
module.exports = { addTasks,getAllTask,getTaskByTaskName }

