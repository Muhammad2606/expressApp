import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
const router = Router()

router.get('/login',(req, res) =>{
    res.render('login',{
        title: "Login | Boomshop"
    })
})

router.get('/register',(req, res) =>{
    res.render('register',{
        title: "Register | Boomshop"
    })
})

router.post('/login', async (req, res) =>{
    const existUser = await User.findOne({email: req.body.email})
    if(!existUser){
        console.log('user not found');
        return
    }
   const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)
    if(!isPassEqual){
        console.log('password wrong');
        return
    }
    console.log(existUser);
    res.redirect('/')
})

router.post('/register', async (req, res) =>{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData  ={
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,

    }

    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')
})

export default router