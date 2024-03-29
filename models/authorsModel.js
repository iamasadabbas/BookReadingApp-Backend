const mongoose = require('mongoose');
const authorsSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    biography:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    },
})
module.exports =mongoose.model('author',authorsSchema);