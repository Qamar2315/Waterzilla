const express= require('express');
const router= express.Router();
const {Account}= require('../models')
const {Orders} = require("../models")
const {Company} = require("../models")
const {Customer} = require("../models")
const {Bottle}= require("../models")

router.get("",async (req,res)=>{
    const companies=await Company.findAll({});
    const bottles=await Bottle.findAll({order:[['id','DESC']]});
    res.json({companies:companies,bottles:bottles});
})
router.post("",async (req,res)=>{
    const company= await Company.findOne({where:{name:req.body.company}})
    req.body.CompanyId= company.id;
    await Bottle.create(req.body);
    res.json({success:"bottle added successfully"});
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const bottle=await Bottle.findByPk(id,{include:Company});
    if(bottle){
        res.json({bottle:bottle.dataValues});
    }else{
        res.json({error:"not found"})
    }
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    const company= await Company.findOne({where:{name:req.body.company}})
    req.body.CompanyId= company.id;
    console.log(company);
    await Bottle.update(req.body,{where:{id:id}})
    res.json({success:"bottle updated successfully"});
})

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Bottle.destroy({where:{id:id}});
    res.json({succes:"deleted successfully"});
})


module.exports=router;