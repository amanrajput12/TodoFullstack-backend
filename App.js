import dotenv from 'dotenv'
import express from 'express'
import conncectToDb from './config/db.js'
import UserSchema from './model/todouser.js'  
import Todo from './model/todoschema.js'
import cookieparser from 'cookie-parser'
import todorouter from './Routes/todo.js'
import userrouter from './Routes/user.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
// connect to db
dotenv.config()
conncectToDb()

// middleware
app.use(express.json())
app.use(cors({
  origin: '*', 
  credentials: true, 
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  headers: 'Set-Cookie', 
}));
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use('/api/todos',todorouter)
app.use('/api/users',userrouter)


app.get('/',(req,res)=>{
    console.log('home route start');
  
  // Set a cookie named 'token'
  res.cookie('token', 'token is valid on this');

  
  res.send('Cookie set successfully');


})






app.listen(process.env.PORT,()=>{
    console.log(`server listen at port ${process.env.PORT}`);
})