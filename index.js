import express, { urlencoded }  from "express";
import {  create } from "express-handlebars";
import AuthRoutera from "./routes/auth.js"
import PruductRouters from "./routes/pruduct.js"
import flash from 'connect-flash'
import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import session from "express-session";
import varMiddleware from './middleware/var.js'
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs'})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
// app.use(Session({secret: 'muhammad', resave: false, saveUninitialzed:false}))
app.use(session({secret: 'Muhammad', resave: false, saveUninitialized: false}))
app.use(flash())
app.use(varMiddleware)

app.use(AuthRoutera)    
app.use(PruductRouters)



const strartApp = () =>{
    try {
        mongoose.set('strictQuery', false);
        
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true})
          .then(() => {
            console.log('MongoDBga muvaffaqiyatli ulanish');
          })
          .catch((err) => {
            console.error('MongoDBga ulanishda xatolik:', err);
          });
        
        
        
        const PORT = process.env.PORT || 4100
        app.listen(PORT, () => console.log(`servis is runing on ${PORT}`))
        
    } catch (error) {
        console.log(error);
    }
}
strartApp()