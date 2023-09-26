
import express from 'express'
const  router = express.Router()
import {register,login,logout}  from '../Controller/userController.js'
import authorize from '../Middleware/authorize.js'

router.post('/register',register)
router.post('/login',login)
router.get('/logout',authorize, logout)

// router.get('/me', authorize,getMe)
// router.put('/updatedetails',authorize, updatedetails)
// router.put('/updatepassword',authorize, updatepassword)
// router.delete('/delete',authorize, deleteUser)


export default router
