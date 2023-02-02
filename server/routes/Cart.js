const express= require('express');
const router= express.Router();
const {Customer} = require("../models");
const {Bottle}= require("../models");
const {Orders}= require("../models");
const {Notifications}= require("../models");
const {Users}= require("../models");
const {Address} = require('../models');

router.get("/:id",async (req,res)=>{
    const user=await Users.findOne({where:{id:req.params.id}});
    const orders=await Orders.findAll({
        where:{CustomerId:user.CustomerId},
        include:[Customer,Bottle],
        order:[['id','DESC']]
    })
    res.json({orders:orders});
})
router.put("/:id",async (req,res)=>{
    const orders=await Orders.update({status:"cancelled"},{where:{id:req.body.oid}})
    await Notifications.create({
        notification:`${req.body.username} cancelled an order`,
    })
    const bottle= await Bottle.findOne({where:{id:req.body.bid}});
    await Bottle.update({quantity:bottle.quantity+1},{where:{id:req.body.bid}});
    res.json({success:"done"});
})

router.post("/:id",async (req,res)=>{
    const bid=req.params.id;
    const cid=req.body.cid;
    const username=req.body.username;
    const user= await Users.findOne({where:{id:cid},include:[Address]})
    const order=await Orders.create({
        status:'new',
        CustomerId:user.CustomerId,
        BottleId:bid
    });
    await Notifications.create({
        notification:`${username} placed an order`,
        AdminId:1
    })
    const bottle= await Bottle.findOne({
        where:{id:bid}
    })
    await Bottle.update({
        quantity:bottle.quantity-1
    },{where:{id:bid}})
    await Orders.update({AddressId:user.Address.id},{where:{id:order.id}});
    res.json({success:"successfully done"});
})



module.exports=router;