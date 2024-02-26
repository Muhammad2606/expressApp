import { Router } from "express";
import Product from "../models/product.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
const router = Router()

router.get('/', async (req, res) =>{
    const products = await Product.find().populate('user').lean()
        
    res.render('index',{
        title: "Home | Boomshop",
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null
    })
})


router.get('/add', authMiddleware, (req, res) =>{
  
    res.render('add',{
        title: "Add | Boomshop",
        isAdd: true,
        errorAddProduct: req.flash('errorAddProduct')
    })
})


router.get('/pruduct', async(req, res) =>{
    const user = req.userId ? req.userId.toString() : null
    const myProduct = await Product.find({user}).populate('user').lean()
    console.log(myProduct);
    res.render('pruduct',{
        title: "Product | Boomshop",
        isProducts: true,
        myProduct: myProduct,
    })
})

router.post('/add-products', userMiddleware, async (req, res) =>{
    const {title, description, image, price} = req.body

    if(!title || !description || !image || !price){
        req.flash('errorAddProduct', 'All fields is required')
        res.redirect('/add')
        return
    }


         await  Product.create({...req.body, user: req.userId})

    res.redirect('/')
})

export default router