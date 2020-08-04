const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const User = require('./models/user');
dotenv.config();


const app = express();

app.use(bodyParser.json());
app.post('/auth/signup', [
    body("email")
        .isEmail()
        .withMessage("이메일형식의 맞지 않습니다."),
    body("password")
        .trim()
        .isLength({min:6})
        .withMessage("비밀번호를 최소 6자 이상 입력해주세요."),
    body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("이름은 필수값입니다.")
] ,(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 402;
        error.data = errors.array();
        throw error;
    }
    console.log(req.body.email);
    const { email, password, name} = res.body;
    res.json({
        message: req.body
    })

    //유저 이메일 체크

    //패스 워드 해쉬화 데이터 저
});

app.use((error, req, res,next)=>{
    const status  = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message, data
    });
});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.taotb.mongodb.net/taskManager?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(4000, ()=> console.log('part 4000 start'));
    }).catch((error)=>{
        console.log(error);
});

