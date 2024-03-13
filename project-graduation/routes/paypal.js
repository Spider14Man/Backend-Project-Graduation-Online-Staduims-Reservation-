
const express=require('express');
const router =express.Router()
const paypal= require('../paypal-api')
router.route('/')
    .post(async (req, res) => {
      try {
          console.log("Request to create order: paypal->routes:\n", req.body);
          // use the cart information passed from the front-end to calculate the order amount detals
          const { product  } = req.body;
          const { jsonResponse, httpStatusCode } = await paypal.createOrder(product);
          res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
        console.error("Failed to create order:", error);
          res.status(500).json({ error: "Failed to create order." });
        }
      })
router.route('/capture')
    .post(async (req, res) => {
        try {
          console.log("Request to capture order:", req.body);

          const { orderID } = req.body;
          console.log(orderID)
          const { jsonResponse, httpStatusCode } = await paypal.captureOrder(orderID);
          console.log(jsonResponse, httpStatusCode )
          res.status(200).json({
            success:"finally",
            data:{
               jsonResponse,
               httpStatusCode }
          });
        } catch (error) {
          console.error("Failed to create order:", error);
          res.status(500).json({ error: "Failed to capture order." });
        }
      });
// router.route('/refresh')
    // .post(refreshToken)
module.exports=router;