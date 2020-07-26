const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const app = express();
dotEnv.config();


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.taotb.mongodb.net/taskManager?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(4000, ()=> console.log('part 4000 start'));
    }).catch((error)=>{
        console.log(error);
});

