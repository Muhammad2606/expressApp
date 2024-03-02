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
        userId: req.userId ? req.userId.toString() : null,
       
        
    })
   
})


router.get('/add', authMiddleware, (req, res) =>{
  
    res.render('add',{
        title: "Add | Boomshop",
        isAdd: true,
        errorAddProduct: req.flash('errorAddProduct')
    })
})


router.get('/product/:id', async (req, res) => {
    
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('user').lean();
        if (!product) {
            return res.status(404).send("Mahsulot topilmadi");
        }
        res.render('product', {
            product: product,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server xatosi");
    }
});


router.get('/pruduct', async(req, res) =>{
    const user = req.userId ? req.userId.toString() : null
    const myProduct = await Product.find({user}).populate('user').lean()
   
    res.render('pruduct',{
        title: "Product | Boomshop",
        isProducts: true,
        myProduct: myProduct,
    })
})

router.get('/edit-product/:id', async (req, res) => {
    
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('user').lean();
        if (!product) {
            return res.status(404).send("Mahsulot topilmadi"); 
        }
        res.render('edit-product', {
            product: product,
            errorEditProduct: req.flash('errorEditProduct')

        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server xatosi");
    }
});

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


router.post('/edit-product/:id', async (req , res) =>{
    const {title, description, image, price} = req.body
    const id = req.params.id;
    if(!title || !description || !image || !price){
        req.flash('errorEditProduct', 'All fields is required')
        res.redirect(`/edit-product/${id}`)
        return
    }
    await   Product.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect('/')
})

router.post('/delete-product/:id', async (req, res) =>{
    const id = req.params.id;
    await Product.findByIdAndDelete(id)
    res.redirect('/')
})

export default router