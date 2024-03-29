const mongoose = require('mongoose');
const tasksSchema= new mongoose.Schema({
    task:{
        type: String,
    }
})
module.exports =mongoose.model('task',tasksSchema);