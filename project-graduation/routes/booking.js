const express=require('express');
const getcheckOutSession=require('../controllers/bookingController')

const router=express.Router()

router.post('/checkout-session/:staduimId',getcheckOutSession)

module.exports=router;