const express= require('express');
const router= express.Router();
const {Reviews} = require("../models")
const {Customer} = require("../models")
const {Users} = require("../models")
const {Bottle} = require("../models")

router.get("/:bid",async (req,res)=>{
    const {bid}=req.params;
    const reviews= await Reviews.findAll({where:{BottleId:bid},include:Customer});
    res.json({reviews:reviews});
})
router.post("",async (req,res)=>{
    const {uid,description,bid}=req.body;
    const user= await Users.findOne({where:{id:uid}});
    await Reviews.create({
        description:description,
        BottleId:bid,
        CustomerId:user.CustomerId
    })
    res.json({success:"Created comment"})

})
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Reviews.destroy({where:{id:id}});
    res.json({success:"Created deleted"})

})


module.exports=router;