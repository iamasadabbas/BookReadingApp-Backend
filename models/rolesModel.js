const mongoose = require('mongoose');
const rolesSchema= new mongoose.Schema({
    role:{
        type: String,
    }
})
module.exports =mongoose.model('role',rolesSchema);