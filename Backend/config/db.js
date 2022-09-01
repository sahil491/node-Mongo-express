const mongoose = require("mongoose");

 
const URI = `mongodb+srv://JyotiPatidar:jyotipatidar@cluster0.gbabe.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async ()=>{
    try { 
        const conn = await mongoose.connect(URI,{
            useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
        })
        console.log(`MOngoDb Connected : `)
    } catch(err){
        console.log("err",err.message)
    }
};

module.exports = connectDB;