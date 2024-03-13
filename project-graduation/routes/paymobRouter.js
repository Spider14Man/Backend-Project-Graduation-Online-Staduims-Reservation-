
const express=require('express');
const router =express.Router()
router.route('/')
    .post(async (req, res) => {
        try {
            const { order_id, amount_cents, currency, integration_id } = req.body;
        
            // Make a request to Paymob API
            const paymobResponse = await axios.post('PAYMOB_API_ENDPOINT', {
              order_id,
              amount_cents,
              currency,
              integration_id,
              // Add more details as needed based on Paymob API documentation
            }, {
              headers: {
                'Authorization': `Bearer YOUR_PAYMOB_API_KEY`,
                'Content-Type': 'application/json',
              },
            });
        
            return {
              statusCode: 200,
              body: JSON.stringify(paymobResponse.data),
            };
          } catch (error) {
            console.error(error);
        
            return {
              statusCode: 500,
              body: JSON.stringify({ error: 'Internal Server Error' }),
            };
          }
  }
    )
    module.exports=router;