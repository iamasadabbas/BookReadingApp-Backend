require('dotenv').config();
require('./config/db');
const path = require('path');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const express = require('express');

const corsOptions ={
    origin: "http://localhost:3001",
    credentials:true,
    optionSuccessStatus:200
    
}
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors(corsOptions))

const authorRoutes = require('./routes/authorRoutes');
app.use('/author', authorRoutes)

const bookmarkRoutes = require('./routes/bookmarkRoutes');
app.use('/bookmark', bookmarkRoutes)

const bookRoutes = require('./routes/bookRoutes');
app.use('/book', bookRoutes)

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/category', categoryRoutes)

const readingHistoryRoutes = require('./routes/readinghistoryRoutes');
app.use('/readinghistory', readingHistoryRoutes)

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes)

const roleRoutes = require('./routes/roleRoutes');
app.use('/role', roleRoutes)

const taskRoutes = require('./routes/taskRoutes');
app.use('/task', taskRoutes)

const manageTaskRoutes = require('./routes/manageTaskRoutes');
app.use('/managetask', manageTaskRoutes)

app.use('/uploads', express.static("uploads"));
app.use('/uploads/bookCoverImage', express.static("bookCoverImage"));
app.listen(process.env.port, () => {
    console.log(`listening at port: ${process.env.port}`)
});