const express= require('express');
const router= express.Router();
const Notifications= require('../models/Notifications')

router.get("",async (req,res)=>{
    const pipeline=[
        {$sort:{"_id":-1}}
    ]
    const notifications=await Notifications.aggregate(pipeline);
    res.json({notifications:notifications});
})

router.delete("",async (req,res)=>{
    await Notifications.deleteMany({});
    res.json({success:"deleted successfully"})
})

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    await Notifications.deleteOne({_id:id});
    res.json({success:"deleted successfully"})
})


module.exports=router;