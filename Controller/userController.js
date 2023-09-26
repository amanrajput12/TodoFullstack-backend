
import Todo  from '../model/todoschema.js'
import jwt  from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { Accountval } from '../Appwrite/config.js'

export const register = async (req, res) => {
    const{name,email,password}=req.body
    console.log(name,email,password);
    try {
        // let user = await User.findOne({email})
    //     if(user){
    //         return res.status(400).json({
    //             message:'user already exists'   })
    // }
     
         const uniqueId = uuidv4()
       const singnPromise =  await Accountval.create(uniqueId,email,password,name)

       console.log('sigup promise', singnPromise['$id']);
         const payLoad ={
            user: singnPromise['$id']
         }
        
         const token = jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:'2h'
         })
         res.cookie('token',token,{
          
            expiresIn:'2h'
         })
    

         res.status(200).json({
            message:'user created',
            singnPromise
         })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }

} 

export const login = async (req, res) => {
    const {email,password}=req.body
    try {

       
        const promise = await Accountval.createEmailSession(email,password)
    //   console.log('promise',promise['$id']);
      console.log('promise 2',promise['userId']);
    
        

        if(promise){
           const payLoad ={
            user: promise['userId']
           } 
           const token = jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:"2h"
         })
       
         console.log(token);
          res.headers["Access-Control-Allow-Origin"]='*'
         res.cookie('token',token,{
            
           
            expiresIn:'2h'
         })
       
         res.status(200).json({
            message:'user Login sucess',
          
        
             promise
         })
           
        }
        

        }

        
     catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }
}


export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({  
        message:'user logged out Sucessfully'
    })
}




export const updatedetails = async (req, res) => {
    const {name,email}=req.body
    try {
        let user = await User.findById(req.user)
        if(!user){  
            return res.status(400).json({ message:'User not found'})
        
        }
        let exists = User.findOne({email})
    console.log(user._id);
        if(exists && exists._id == user._id ){
            return  res.status(404).json({message:'email already exists'})
        }
        user.name=name
        user.email=email
        await user.save()

        user.password=undefined
        return res.status(200).json({message:'user updated',user})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message) 
    }
}

export const updatepassword = async (req, res) => {
const {password,newpassword}=req.body
try {
    let user = await User.findById(req.user)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid credential"})
    
    }
    user.password = await bcrypt.hash(newpassword,10)
    await user.save()
    user.password = undefined   
    res.status(200).json({message:"password update sucessfully"})

} catch (error) {
    console.log(error.message);
    res.status(500).send('server error' + error.message)   
}
}

export const deleteUser = async (req, res) => {

    try {
        const user = await User.findById(req.user)
        if(!user){
            return res.status(400).json({ message:'User not found'})
        
        }
        const todo = await Todo.find({user: req.user})
        if (todo){
            await Todo.deleteMany({ user: req.user });
        }
        await user.deleteOne({_id: req.user})
        res.status(200).json({message:'user deleted sucessfully',user})
    }
     catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message) 
    }
} 