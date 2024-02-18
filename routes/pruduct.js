import { Router } from "express";
const router = Router()

router.get('/',(req, res) =>{
    res.render('index',{
        title: "Home | Boomshop",
        
    })
})


router.get('/add',(req, res) =>{
    res.render('add',{
        title: "Add | Boomshop",
        isAdd: true,
    })
})


router.get('/pruduct',(req, res) =>{
    res.render('pruduct',{
        title: "Product | Boomshop",
        isProducts: true,
    })
})

export default router