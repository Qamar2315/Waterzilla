const express= require('express');
const router= express.Router();
const {Notifications} = require("../models")

router.get("",async (req,res)=>{
    const notifications=await Notifications.findAll({order:[['id','DESC']]});
    res.json({notifications:notifications});
})

router.delete("",async (req,res)=>{
    await Notifications.destroy({where:{}});
    res.json({success:"deleted successfully"})
})
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Notifications.destroy({where:{id:id}});
    res.json({success:"deleted successfully"})
})


module.exports=router;