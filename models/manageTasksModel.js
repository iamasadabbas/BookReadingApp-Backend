
const mongoose = require('mongoose');
const manageTasksSchema= new mongoose.Schema({
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
    },
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    },
    status:{
        type:Boolean
    }
})
// manageTasksSchema.index({ roleId: 1, taskId: 1 }, { unique: true });
module.exports =mongoose.model('manageTask',manageTasksSchema);