import express  from "express";
import {  create } from "express-handlebars";
import flash from 'connect-flash'
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
// routes 
import AuthRoutera from "./routes/auth.js"
import PruductRouters from "./routes/pruduct.js"
// varMiddleware
import varMiddleware from './middleware/var.js'
import userMiddleware from "./middleware/user.js";
import hbhelpers from './utils/index.js'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs', helpers:hbhelpers })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use(session({secret: 'Muhammad', resave: false, saveUninitialized: false}))
app.use(flash())
// middleware
app.use(varMiddleware)
app.use(userMiddleware)
// auth 
app.use(AuthRoutera)    
app.use(PruductRouters)





const startApp = async () => {
  try {

      // MongoDB serveriga ulanish
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDBga muvaffaqiyatli ulanish');

      // Express serverini boshlash
      const PORT = process.env.PORT || 4100;
      app.listen(PORT, () => console.log(`Servis ${PORT} portida ishga tushirildi`));
      
  } catch (error) {
      console.error('Xatolik yuz berdi:', error);
  }
};

startApp();
