const express= require('express');
const router= express.Router();
const {Orders} = require("../models");
const {Bottle} = require('../models');
const sequelize=require('sequelize');

router.get("",async (req,res)=>{
    const deliveredOrders= await Orders.findAll({
        attributes:[[sequelize.fn('sum',sequelize.col('Bottle.price')),'total_sale'],
        [sequelize.fn('count',sequelize.col('Bottle.price')),'total_deliveries']],
        where:{status:"delivered"},
        include:Bottle
    })
    const cancelledOrders= await Orders.findAll({
        attributes:[[sequelize.fn('sum',sequelize.col('Bottle.price')),'total_sale_cancelled'],
        [sequelize.fn('count',sequelize.col('Bottle.price')),'total_cancelled']],
        where:{status:"cancelled"},
        include:Bottle
    })
    const newOrders= await Orders.findAll({
        attributes:
        [[sequelize.fn('count',sequelize.col('Bottle.price')),'total_new']],
        where:{status:"new"},
        include:Bottle
    })
    const acceptedOrders= await Orders.findAll({
        attributes:
        [[sequelize.fn('count',sequelize.col('Bottle.price')),'total_accepted']],
        where:{status:"accepted"},
        include:Bottle
    })
    res.json({
        deliveredOrders:deliveredOrders,
        cancelledOrders:cancelledOrders,
        newOrders:newOrders,
        acceptedOrders:acceptedOrders
    });
})

module.exports=router;