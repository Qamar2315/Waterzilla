const express= require('express');
const router= express.Router();
const bcrypt = require("bcrypt");
const {Account}= require('../models')
const {Orders} = require("../models")
const {Company} = require("../models")
const {Customer} = require("../models");
const {Address} = require("../models");
const {Users} = require("../models");
const {sign} = require("jsonwebtoken");
const {Bottle} = require('../models');
const {Website}=require('../models')
const sequelize=require('sequelize');

router.post("/upload", (req, res)=>{
    console.log(req.body);
})

router.post("/",async (req, res,)=>{
    const {username,password}=req.body;
    const account=await Account.findOne({where:{username:username}});
    if(!account){
        res.json({error:"Admin doesnot exist"})
    }else{
        bcrypt.compare(password,account.password).then((match)=>{
            if(match){
                const accessToken=sign(
                    {
                        username:account.username,
                        id:account.id,
                    },
                    "secret1234"
                );
                res.json({
                    success:"Logged In",
                    token:accessToken,
                    username:account.username,
                    id:account.id
                });
            }else{
                res.json({error:"wrong username or password"});
            }
        })
    }
})

router.get("/dashboard",async (req,res)=>{
    const totalOrders=await Orders.findAndCountAll({});
    const totalNewOrders=await Orders.findAndCountAll({where:{status:"new"}});
    const totalAcceptedOrders=await Orders.findAndCountAll({where:{status:"accepted"}});
    const totalDeliveredOrders=await Orders.findAndCountAll({where:{status:"delivered"}});
    const totalCancelledOrders=await Orders.findAndCountAll({where:{status:"cancelled"}});
    const totalCompanies=await Company.findAndCountAll({});
    const totalCustomers= await Customer.findAndCountAll({});
    const deliveredOrders= await Orders.findOne({
        attributes:[[sequelize.fn('sum',sequelize.col('Bottle.price')),'total_sale']],
        where:{status:"delivered"},
        include:Bottle
    })
    const data={
        totalOrders:totalOrders.count,
        totalNewOrders:totalNewOrders.count,
        totalAcceptedOrders:totalAcceptedOrders.count,
        totalDeliveredOrders:totalDeliveredOrders.count,
        totalCancelledOrders:totalCancelledOrders.count,
        totalCompanies:totalCompanies.count,
        totalCustomers:totalCustomers.count,
        totalSales:deliveredOrders
    }
    res.json(data);
})

router.put("/settings",async (req,res)=>{
    bcrypt.hash(req.body.password,10).then((password)=>{
        Account.update({password:password},{where:{id:1}})
    })
    res.json({succes:"Updated Succesfully"})
})

router.get("/profile",async (req,res)=>{
    const admin=await Users.findByPk(1);
    const address= await Address.findOne({where:{id:1}})
    const account= await Account.findOne({where:{id:1}})
    res.json({admin:admin,address:address,account:account})
})

router.get("/aboutus",async (req,res)=>{
    const aboutus=await Website.findOne({attributes:['aboutUs','image']})
    res.json({aboutus:aboutus})
})
router.put("/profile",async (req,res)=>{
    const user={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        cnic:req.body.cnic,
        phone:req.body.phone,
        email:req.body.email,
    }
    const address={
        houseNo:req.body.houseNo,
        streetNo:req.body.streetNo,
        city:req.body.city,
        zipCode:req.body.zipCode
    }
    bcrypt.hash(req.body.password,10).then((pass)=>{
        Account.update({
            username:req.body.username,
            password:pass},
            {where:{id:1}
        })
    })
    await Users.update(user,{where:{id:1}})
    await Address.update(address,{where:{id:1}})
    res.json({success:"updated"})
})

module.exports = router;