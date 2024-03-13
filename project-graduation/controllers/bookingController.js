const Stripe= require("stripe") ;
const User= require('../models/user.model') 
const Stadium = require('../models/stadium')
const stripe = require('stripe')('your_stripe_secret_key');
const getcheckOutSession=async(req,res)=>{
    try {
        const stadium=await Stadium.findById(req.params.stadiumId)
        // const user =await User.findById(req.params.userId)
        const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
        const session =await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/staduim/${stadium._id}`,
            // customer_email:user.email,
            client_reference_id:req.params.stadiumId,
            line_items:[{
                price_data:{
                    currency:'bdt',
                    unit_amount:100,
                    product_data:{
                        name:stadium.name,
                        description:stadium.description,
                        images:[stadium.avatar],
                    }
                },
                quantity:1
            }]
        })
        // const booking=new Booking({
        //     staduim:stadium._id,
        //     // user:user._id,
        //     ticketPrice:stadium.price,
        //     session:session.id
        // })
        // await booking.save()
        res.send(200).json({
            success:true,
            message:'success ya rab'
        })
    } catch (error) {
        console.log("error ",error);
        res.status(500).json({
            success:false,
            message:'llasf baysa bardo'
        })
    }
}

module.exports=getcheckOutSession;
