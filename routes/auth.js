import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { ganerateJWTToken } from "../services/token.js";
import registerMiddleware from "../middleware/register.js";
const router = Router()

router.get('/login', registerMiddleware , (req, res) =>{
   
    res.render('login',{
        title: "Login | Boomshop",
        loginError: req.flash('loginError')
    })
})

router.get('/register', registerMiddleware, (req, res) =>{
 
    res.render('register',{
        title: "Register | Boomshop",
        registerError: req.flash('registerError')
    })
})

router.get('/Logout', (req, res,) =>{
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/login', async (req, res) =>{
    const {email, password} = req.body

    if(!email || !password){
        req.flash('loginError', 'All fields is required')
        res.redirect('/login')
        return
    }
    const existUser = await User.findOne({email})
    if(!existUser){
        req.flash('loginError', 'User not found')
        res.redirect('/login')
        return
    }
   const isPassEqual = await bcrypt.compare(password, existUser.password)
    if(!isPassEqual){
        req.flash('loginError', 'Password wrong')
        res.redirect('/login')
        return
    }
    const token = ganerateJWTToken(existUser._id)
   
  
    res.cookie('token', token, { secure: true})
    res.redirect('/')
})

router.post('/register', async (req, res) =>{
    const {firstname, lastname, email, password} = req.body

    if(!firstname || !lastname || !email || !password){
        req.flash('registerError', 'All fields is required')
        res.redirect('/register')
        return
    }

    

    const candidate = await User.findOne({email})

	if (candidate) {
		req.flash('registerError', 'User already exist')
		res.redirect('/register')
		return
	}
        const hashedPassword = await bcrypt.hash(password, 10)
    const userData  ={
        firstName: firstname,
        lastName: lastname,
        email: email, 
        password: hashedPassword,

    }

    const user = await User.create(userData)
    const token = ganerateJWTToken(user._id)
    res.cookie('token', token, { secure: true})
   

    res.redirect('/')
})

export default router