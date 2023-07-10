const express=require('express')
const controller=require('../controllers/userController')

const router=express.Router()

router.post('/user/signup',controller.signup)

module.exports=router