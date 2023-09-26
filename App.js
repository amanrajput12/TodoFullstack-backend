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
    origin: 'http://localhost:5173',
  credentials: true,
}))
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

app.post('/user',async(req,res)=>{
try {
    const {email}= req.body
    const user = await UserSchema.create({email})
    res.status(200).json({
        message:'user created successfully',
        user
    })

} catch (error) {
    console.log(error.message);
}
})

app.post('/todo',async(req,res)=>{
   
try {
    
    const {task}= req.body
    const todo = await Todo.create({task})
     res.status(200).json({
      message:'todo created successfully',
      todo  
    })
} catch (error) {
    console.log(error.message);
}

})


app.listen(process.env.PORT,()=>{
    console.log(`server listen at port ${process.env.PORT}`);
})