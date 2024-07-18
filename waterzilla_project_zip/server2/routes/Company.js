const express= require('express');
const router= express.Router();
const {validateToken}=require('../middlewares/isLogin')
const Account= require('../models/Account')
const Orders = require("../models/Orders")
const Company = require("../models/Company")
const Customer = require("../models/Customer")
const Bottle= require("../models/Bottle");

router.get("",async (req,res)=>{
    const pipeline=[
        {$sort:{"_id":-1}}
    ]
    const companies=await Company.aggregate(pipeline);
    res.json({company:companies});
})

router.post("",async (req,res)=>{
    const company= new Company(req.body);
    company.save();
    res.json(company);
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const company=await Company.findOne({_id:id});
    if(company){
        res.json({company:company});
    }else{
        res.json({error:"not found"})
    }
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    await Company.updateOne({_id:id},req.body)
    res.json({success:"bottle updated successfully"});
})

router.delete("/:id",validateToken,async (req,res)=>{
    const {id}=req.params;
    const company= await Company.findOne({_id:id});
    await Bottle.deleteMany({company:company._id});
    await Company.deleteOne({_id:id});
    res.json({succes:"deleted successfully"});
})

module.exports=router;