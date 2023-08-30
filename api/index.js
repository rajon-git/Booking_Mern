const express=require("express");
const app=express();
const path=require("path")
const mongoose=require("mongoose")
const morgan=require("morgan")
const helmet=require("helmet")
const {readdirSync}=require("fs")
const cors=require("cors")
require("dotenv").config();

//implement middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//routes middelwares
readdirSync("./routes").map(r=>app.use("/api/v1",require(`./routes/${r}`)));
//server
const port=process.env.PORT || 8000;

mongoose.connect(process.env.MONGO)
        .then( ()=>{
            app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
           });
        })
         .catch((error)=> console.log(error));
