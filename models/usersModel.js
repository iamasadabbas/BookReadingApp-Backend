const mongoose = require('mongoose');
const usersSchema= new mongoose.Schema({
    username:{
        type: String,
        
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default:"admin"
    },
})
module.exports =mongoose.model('user',usersSchema);