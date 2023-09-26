
import Todo from '../model/todoschema.js'


export const getTodos = async (req,res)=>{
    try {
       const todos = await Todo.find({user: req.user}) 
       console.log(req.user);
       res.status(200).json({
        message:"get toodos fetched successfully",
        todos
       })
       console.log(todos);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }
}

export const getTodo = async (req,res)=>{
    const {id} = req.params
    try {
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({message:'todo not found'})
        
        }
        if(todo.user.toString() !== req.user){
            return res.status(401).json({message:'unauthorized'})
        }
        res.status(200).json({
            message:"todo found",
            todo
        }) 

    }
    
     catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }
}

export const createTodo  = async (req,res)=>{
    const {title,description} = req.body
    console.log(req.user,title,description  );
    try {
     const todo = await Todo.create({
        title,
        description,
        completed:false,
        user:req.user 
     })
     res.status(201).json({
        message:'todo created successfully',
        todo
     })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message) 
    }
}

export const updateTodo = async (req,res)=>{
    const {id}= req.params
    const {title,description,completed} = req.body  
    try {
const todo = await Todo.findById(id)
if(!todo){
    res.status(404).json({message:'todo not found'})
}
const todoId = todo.user.toString();
const reqId = req.user.toString()
console.log('check',todoId === reqId);
if(todoId !==reqId){
    return res.status(401).json({
        message:'not authorize'
    })
}
 todo.title = title,
 todo.description = description,
 todo.completed= completed
 await    todo.save()
 res.status(200).json({
    message:'todo updated successfully',
    todo
 })    
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }
}

export const deleteTodo = async (req,res)=>{
    const {id}= req.params
    try {
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({message:"todo not found"})
        }
        const todoId = todo.user.toString();
        const reqId = req.user.toString()

        if(todoId!==reqId){
            return res.status(401).json({
                message:'not authorize'
            })
         }
         await todo.deleteOne({id:id})
         res.status(200).json({
             message:'todo delted sucessfully'
         })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error' + error.message)
    }
}