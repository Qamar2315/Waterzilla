const express = require('express');
const router = express.Router();
const Customer = require("../models/Customer");
const Bottle = require("../models/Bottle");
const Orders = require("../models/Orders");
const Notifications = require("../models/Notifications");
const Users = require("../models/Users");
const Address = require('../models/Address');
const Account = require('../models/Account');

router.get("/:id", async (req, res) => {
    const account = await Account.findOne({ _id: req.params.id });
    const user=await Users.findOne({account:account._id});
    const customer= await Customer.findOne({user:user._id}).populate('orders');
    res.json({ orders: customer.orders });
})

router.put("/:id", async (req, res) => {
    await Orders.updateOne({ _id: req.body.oid }, { status: "cancelled" })
    const notification = new Notifications({
        notification: `${req.body.username} cancelled an order`,
    });
    console.log(req.body);
    await notification.save();
    const bottle = await Bottle.findOne({ _id: req.body.bid });
    console.log(bottle);
    await Bottle.updateOne({ _id: req.body.bid }, { quantity: bottle.quantity + 1 });
    res.json({ success: "done" });
})

router.post("/:id", async (req, res) => {
    const bid = req.params.id;
    const cid = req.body.cid;
    const username = req.body.username;
    const order = new Orders({
        status: 'new'
    });
    const notification = new Notifications({
        notification: `${username} placed an order`
    })
    await notification.save()
    const bottle = await Bottle.findOne({
        _id: bid
    })
    await Bottle.updateOne(
        { 
            _id: bid 
        },
        {
            quantity: bottle.quantity - 1
        })
    const user = await Users.findOne({ account: cid });
    const customer=await Customer.findOne({user:user._id});
    order.Bottle=bottle;
    order.Customer=customer;
    order.Address=user.address;
    await order.save();
    customer.orders.push(order);
    await customer.save();
    res.json({ success: "successfully done" });
})



module.exports = router;