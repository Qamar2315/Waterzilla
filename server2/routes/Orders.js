const express= require('express');
const router= express.Router();

const Bottle= require('../models/Bottle');
const Users= require('../models/Users');
const Address=require('../models/Address')
const Orders=require('../models/Orders');
const Customer=require('../models/Customer');

router.get("",async (req,res)=>{    
    var orders=await Orders.find({}).populate('Bottle').populate('Customer');
    res.json({orders:orders});
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const orders=await Orders.findById(id).populate('Customer').populate('Bottle').populate('Address');
    res.json({orders:orders});
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    await Orders.updateOne({_id:id},req.body);
    res.json({success:"updated successfully"})
})

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Orders.deleteOne({_id:id})
    res.json({success:"successfully deleted"})
})


module.exports=router;