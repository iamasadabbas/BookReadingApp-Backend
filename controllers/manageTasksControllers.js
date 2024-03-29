const express = require('express');
const manageTask=require('../models/manageTasksModel')


const addManageTasks = async (req, resp) => {
    try {
        const { roleId, taskId } = req.body;
        const existingTask = await manageTask.findOne({ roleId, taskId });
        // console.log(existingTask);

        if (existingTask) {
            return resp.send({ status: 400, message: 'This combination of roleId and taskId already exists.' });
        }

        const newTask = new manageTask({ roleId, taskId,status:false });
        await newTask.save();
        return resp.status(200).send({ status: 200, message: 'Manage Task Successfully' });
    } catch (error) {
        console.error('Error occurred while saving:', error);
        return resp.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};



const updateManageTask = async (req, resp) => {
    try {
        // const { status } = req.body;

        let data = await manageTask.updateOne({ id: req.params._id }, { $set: req.body });

        if (data.modifiedCount === 1) {
            return resp.status(200).send({ message: 'manageTask updated successfully' });
        } else {
            
            return resp.status(404).send({ message: 'manageTask not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        return resp.status(500).send({ message: 'An error occurred while updating user data' });
    }

}

const getManageTaskByRoleId = async (req, resp) => {
    let result = await manageTask.find({ roleId: req.params.roleId }).populate('taskId');
    return resp.send(result)
}
const getManageTaskByTaskId = async (req, resp) => {
    let result = await manageTask.updateOne({ taskId: req.params.taskId,roleId: req.params.roleId }, { $set: req.body }).populate('taskId');
    return resp.send(result)
}
const getStatusByTaskIdAndRoleId = async (req, resp) => {
    const {  roleId,taskId } = req.body;
    let result = await manageTask.find({  roleId,taskId });
    // console.log(result);
    if (result.length > 0) {
        const status = result[0].status;
    // console.log(result.status);
    return resp.send(status);
}else{
    return resp.status(400).send({message:'invalid'});
}
}


module.exports = { addManageTasks,updateManageTask,getManageTaskByRoleId,getManageTaskByTaskId,getStatusByTaskIdAndRoleId }

