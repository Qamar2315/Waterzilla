const express= require('express');
const router= express.Router();
const {Company} = require("../models")
const {Bottle} = require("../models")
const{validateToken}= require("../middlewares/isLogin");


router.get("",async (req,res)=>{
    const companies=await Company.findAll({
        order: [
            ['id', 'DESC'],
        ]
    });
    res.json({company:companies});
})

router.post("",async (req,res)=>{
    const bottle= await Company.create(req.body);
    res.json(bottle)
})

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    const company=await Company.findByPk(id);
    if(company){
        res.json({company:company.dataValues});
    }else{
        res.json({error:"not found"})
    }
})

router.put("/:id",async (req,res)=>{
    const {id}=req.params;
    await Company.update(req.body,{where:{id:id}})
    res.json({success:"bottle updated successfully"});
})

router.delete("/:id",validateToken,async (req,res)=>{
    const {id}=req.params;
    await Bottle.destroy({where:{CompanyId:id}});
    await Company.destroy({where:{id:id}});
    res.json({succes:"deleted successfully"});
})

module.exports=router;