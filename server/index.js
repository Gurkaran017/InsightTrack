const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/authRoute");
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

app.use(express.json());
// app.use(cors());

app.use(cors({
    credentials:true,
    origin:"https://insighttrack.onrender.com/"
    }))

app.use("/api/auth", router);

mongoose
.connect(process.env.MONGO)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(`MongoDB not connected ${err}`));

const _dirname = path.resolve();

app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    });
});

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get("*" , (_,res) => {
  res.sendFile(path.resolve(_dirname, "client" , "dist" , "index.html"));
}) 

app.listen(3000, ()=>{
    console.log("App is started at port 3000");
})