const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{
    dbName:"bookreadingapp"
}).then(()=>{
    console.log("Database Connected successfully");
}).catch((err)=>{
    console.log(err.message);
})
