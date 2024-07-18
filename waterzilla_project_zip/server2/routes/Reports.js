const express= require('express');
const router= express.Router();
const Bottle=require('../models/Bottle');
const Orders=require('../models/Orders');

router.get("",async (req,res)=>{

    const totalNewOrders = await Orders.find({ status: "new" });
    const totalAcceptedOrders = await Orders.find({ status: "accepted" });
    const totalDeliveredOrders = await Orders.find({ status: "delivered" });
    const totalCancelledOrders = await Orders.find({ status: "cancelled" });

    let deliveredOrders = 0;
    for (const order of totalDeliveredOrders) {
        await order.populate('Bottle');
        deliveredOrders += order.Bottle.price;
    }

    let cancelledOrders = 0;
    for (const order of totalCancelledOrders) {
        await order.populate('Bottle');
        cancelledOrders += order.Bottle.price;
    }
    res.json({
        deliveredOrders:[{total_sale:deliveredOrders,total_deliveries:totalDeliveredOrders.length}],
        cancelledOrders:[{total_sale_cancelled:cancelledOrders,total_cancelled:totalCancelledOrders.length}],
        newOrders:[{total_new:totalNewOrders.length}],
        acceptedOrders:[{total_accepted:totalAcceptedOrders.length}]
    });
})

module.exports=router;