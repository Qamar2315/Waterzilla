const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Orders = require('../models/Orders');
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const Bottle = require('../models/Bottle');
const Address = require('../models/Address');
const Users = require('../models/Users');
const Website = require('../models/Website');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/upload", (req, res) => {

})

router.post("/", async (req, res,) => {
    const { username, password } = req.body;
    const account = await Account.findOne({ username: username });
    if (!account) {
        res.json({ error: "Admin doesnot exist" })
    } else {
        bcrypt.compare(password, account.password).then((match) => {
            if (match) {
                const accessToken = sign(
                    {
                        username: account.username,
                        id: account.id,
                    },
                    "secret1234"
                );
                res.json({
                    success: "Logged In",
                    token: accessToken,
                    username: account.username,
                    id: account.id
                });
            } else {
                res.json({ error: "wrong username or password" });
            }
        })
    }
})

router.get("/dashboard", async (req, res) => {

    const pipeline = [
        { $group: { _id: null, count: { $sum: 1 } } }
    ];
    const pipelineNew = [
        {$match:{status:"new"}},
        { $group: { _id: null, count: { $sum: 1 } } }
    ];
    const pipelineAccepted = [
        {$match:{status:"accepted"}},
        { $group: { _id: null, count: { $sum: 1 } } }
    ];
    const pipelineDelivered = [
        {$match:{status:"delivered"}},
        { $group: { _id: null, count: { $sum: 1 } } }
    ];
    const pipelineCancelled = [
        {$match:{status:"cancelled"}},
        { $group: { _id: null, count: { $sum: 1 } } }
    ];

    const totalOrders = await Orders.aggregate(pipeline);
    const totalNewOrders = await Orders.aggregate(pipelineNew);
    const totalAcceptedOrders = await Orders.aggregate(pipelineAccepted);
    const totalDeliveredOrders = await Orders.aggregate(pipelineDelivered);
    const totalCancelledOrders = await Orders.aggregate(pipelineCancelled);
    const totalCompanies = await Company.aggregate(pipeline);
    const totalCustomers = await Customer.aggregate(pipeline);
    let totalSales = 0;
    const totalOrders_ =await Orders.find({status:"delivered"});
    for (const order of totalOrders_) {
        await order.populate('Bottle');
        totalSales += order.Bottle.price;
    }
    const data = {
        totalOrders: totalOrders.length ,
        totalNewOrders: totalNewOrders[0].count,
        totalAcceptedOrders: totalAcceptedOrders[0].count,
        totalDeliveredOrders: totalDeliveredOrders[0].count ,
        totalCancelledOrders: totalCancelledOrders[0].count,
        totalCompanies: totalCompanies[0].count,
        totalCustomers: totalCustomers[0].count,
        totalSales: { total_sale: totalSales }
    }
    res.json(data);
})

router.put("/settings", async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((password) => {
        Account.updateOne({ _id: "63b2683b83ba62fecf545fe0" }, { $set: { password: password } });
    })
    res.json({ succes: "Updated Succesfully" })

})

router.get("/profile", async (req, res) => {
    const admin = await Users.findOne({ _id: "63b26d975091f63df8b44c48" });
    const address = await Address.findOne({ _id: "63b268be9ee0be7e55a1bff3" })
    const account = await Account.findOne({ _id: "63b2683b83ba62fecf545fe0" })
    res.json({ admin: admin, address: address, account: account })
})

router.get("/aboutus", async (req, res) => {
    const aboutus = await Website.findOne({})
    res.json({ aboutus: aboutus })
})

router.put("/profile", async (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        cnic: req.body.cnic,
        phone: req.body.phone,
        email: req.body.email,
    }
    const address = {
        houseNo: req.body.houseNo,
        streetNo: req.body.streetNo,
        city: req.body.city,
        zipCode: req.body.zipCode
    }
    bcrypt.hash(req.body.password, 10).then((pass) => {
        Account.updateOne(
            {
                _id:"63b2683b83ba62fecf545fe0"
            },
            {
            username: req.body.username,
            password: pass
        })
    })
    await Users.updateOne({_id:"63b26d975091f63df8b44c48"},user)
    await Address.updateOne({_id:"63b268be9ee0be7e55a1bff3"},address)
    res.json({ success: "updated" })
})

module.exports = router;