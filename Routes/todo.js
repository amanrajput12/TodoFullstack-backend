import express from 'express'
import authorize from '../Middleware/authorize.js'
import { getTodo,deleteTodo,getTodos,createTodo,updateTodo } from '../Controller/todoController.js'
const router = express.Router()

router.get('/:id',authorize,getTodo)

router.get('/',authorize,getTodos)

router.post('/create',authorize,createTodo)

router.patch('/update/:id',authorize,updateTodo)

router.delete('/delete/:id',authorize,deleteTodo)

export default router