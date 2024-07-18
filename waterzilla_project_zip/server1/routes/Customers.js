const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const { Customer } = require('../models');
const { Address } = require('../models');
const { Users } = require('../models');
const { Account } = require('../models');
const {sign} = require("jsonwebtoken");


router.get("", async (req, res) => {
    const customers = await Customer.findAll({
        order: [
            ['id', 'DESC'],
        ]
    });
    res.send({ customers: customers });
})

router.post("/register", async (req, res) => {
    const customer = {
        name: req.body.name,
        profilePic: req.body.profilePic
    }
    
    const newCustomer= await Customer.create(customer)
    const user = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        cnic: req.body.cnic,
        phone: req.body.phone,
        email: req.body.email,
        CustomerId:newCustomer.id
    }
    const newUser=await Users.create(user)


    bcrypt.hash(req.body.password, 10).then((pass) => {
        Account.create({
            username: req.body.username,
            password: pass,
            UserId:newUser.id
        })
    })
    const address = {
        houseNo: req.body.houseNo,
        streetNo: req.body.streetNo,
        city: req.body.city,
        zipCode: req.body.zipCode,
        UserId:newUser.id
    }
    await Address.create(address);
    res.json({ success: "updated" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const account = await Account.findOne({ where: { username: username } });
    if (!account) {
        res.json({ error: "Customer doesnot exist" })
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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    //const user= await Users.findOne({where:{id:id}});
    const customer = await Customer.findByPk(id, { include: Users });
    const address = await Address.findOne({ where: { UserId: customer.User.id } })
    const account = await Account.findOne({ where: { UserId: customer.User.id } })
    res.json({ customer: customer, address: address, account: account })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const customer = {
        name: req.body.name,
        profilePic: req.body.profilePic
    }
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
        Account.update({
            username: req.body.username,
            password: pass
        },
            {
                where: { UserId: req.body.uid }
            })
    })
    await Customer.update(customer, { where: { id: id } })
    await Users.update(user, { where: { id: req.body.uid } })
    await Address.update(address, { where: { UserId: req.body.uid } })
    res.json({ success: "updated" })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, { include: Users });
    const address = await Address.findOne({ where: { UserId: customer.User.id } })
    const account = await Account.findOne({ where: { UserId: customer.User.id } })
    await Customer.destroy({ where: { id: id } });
    res.json({ success: "deleted" })
})

module.exports = router;