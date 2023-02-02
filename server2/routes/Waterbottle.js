const express= require('express');
const router= express.Router();
const Account= require('../models/Account')
const Orders = require("../models/Orders")
const Company = require("../models/Company")
const Customer = require("../models/Customer")
const Bottle= require("../models/Bottle")

router.get("",async (req,res)=>{
    const pipeline=[
        {$sort:{"_id":-1}}
    ]
    const companies=await Company.find({});
    const bottles=await Bottle.aggregate(pipeline);
    res.json({companies:companies,bottles:bottles});
})
router.post("",async (req,res)=>{
    const company= await Company.findOne({name:req.body.company})
    const bottle=new Bottle(req.body);
    bottle.company=company;
    bottle.save();
    res.json({success:"bottle added successfully"});
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const bottle=await Bottle.findOne({_id:id}).populate('company').populate('reviews');
    if(bottle){
        res.json({bottle:bottle});
    }else{
        res.json({error:"not found"})
    }
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    const company= await Company.findOne({name:req.body.company})
    req.body.company= company._id;
    await Bottle.updateOne({_id:id},req.body)
    res.json({success:"bottle updated successfully"});
})

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Bottle.deleteOne({_id:id});
    res.json({succes:"deleted successfully"});
})

module.exports=router;