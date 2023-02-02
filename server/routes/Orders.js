const express= require('express');
const router= express.Router();
const {Orders} = require("../models");
const {Bottle} = require('../models');
const {Customer} = require('../models');
const {Address} = require('../models');

router.get("",async (req,res)=>{
    const orders=await Orders.findAll({include:[Customer,Bottle],order:[['id','DESC']]});
    res.json({orders:orders});
})
router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const orders=await Orders.findByPk(id,{include:[Customer,Bottle,Address]});
    res.json({orders:orders});
})
router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    await Orders.update(req.body,{where:{id:id}})
    res.json({success:"updated successfully"})
})

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Orders.destroy({where:{id:id}})
    res.json({success:"successfully deleted"})
})


module.exports=router;