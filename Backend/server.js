const express = require('express');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
// const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const app = express();
connectDB();
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("api is running")
})
// user routes 
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);
app.use(notFound)
app.use(errorHandler)
app.listen(6000,(err)=>{ 
    if(err){
        console.log(err)
    }else{
       console.log("server is running")
    }
}) 