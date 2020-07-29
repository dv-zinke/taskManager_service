import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();


const app = express();

app.use(bodyParser.json())
app.post('/auth/signup', (req,res,next)=>{
    console.log(req.body.email);
    res.json({
        message: req.body
    })
});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.taotb.mongodb.net/taskManager?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(4000, ()=> console.log('part 4000 start'));
    }).catch((error)=>{
        console.log(error);
});

