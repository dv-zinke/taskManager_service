const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
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
        .isLength({min: 6})
        .withMessage("비밀번호를 최소 6자 이상 입력해주세요."),
    body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("이름은 필수값입니다.")
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 402;
        error.data = errors.array();
        next(error);
    }
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //유저 이메일 체크

    //패스 워드 해쉬화 데이터 저장
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            hashedPassword,
            name
        });

        const result = await user.save();


        res.status(201).json({
            message: "User created",
            user: result
        });
    }catch(e){
        if(!e.statusCode) {
            e.statusCode = 500;
        }
        next(e);
    }
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message, data
    });
});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.taotb.mongodb.net/taskManager?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => console.log('part 4000 start'));
    }).catch((error) => {
    console.log(error);
});

