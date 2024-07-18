const express = require('express');
const router = express.Router();
const { sign } = require("jsonwebtoken");
const Customer = require('../models/Customer');
const Address = require('../models/Address');
const Users = require('../models/Users');
const Account = require('../models/Account');
const bcrypt = require('bcrypt');

router.get("", async (req, res) => {
    const pipeline=[
        {$sort:{"_id":-1}}
    ]
    const customers = await Customer.aggregate(pipeline);
    res.send({ customers: customers });
})

router.post("/register", async (req, res) => {
    const customer = {
        name: req.body.name,
        profilePic: req.body.profilePic
    }

    const newCustomer = new Customer(customer);

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
        const newUser = new Users(user);
        const account = new Account({
            username: req.body.username,
            password: pass
        })
        const newAddress = new Address(address);
        newUser.account = account;
        newUser.address = newAddress;
        newCustomer.user = newUser;
        account.save();
        newAddress.save();
        newCustomer.save();
        newUser.save();
    })

    
    res.json({ success: "updated" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const account = await Account.findOne({ username: username });
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
                    id: account._id
                });
            } else {
                res.json({ error: "wrong username or password" });
            }
        })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({ _id: id }).populate('user');
    await customer.user.populate('address');
    const address = customer.user.address;
    await customer.user.populate('account');
    const account = customer.user.account;
    res.json({ customer: customer, address: address, account: account })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const customer_ = await Customer.findOne({ _id: id });
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
        Account.updateOne(
            {
                _id: customer_.user.account._id
            },

            {
                username: req.body.username,
                password: pass
            }
        )
    })
    await Customer.updateOne({ _id: id } ,customer)
    await Users.updateOne({_id:customer_.user.id},user)
    await Address.updateOne({_id:customer_.user.address._id},address)
    res.json({ success: "updated" })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({_id:id});
    await Address.deleteOne({_id:customer.user.address._id});
    await Account.deleteOne({_id:customer.user.account._id});
    await Customer.destroy({ id: id });
    res.json({ success: "deleted" })
})

module.exports = router;