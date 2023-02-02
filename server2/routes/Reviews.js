const express = require('express');
const Account = require('../models/Account');
const router = express.Router();
const Bottle = require('../models/Bottle');
const Customer = require('../models/Customer');
const Reviews = require('../models/Reviews');
const Users = require('../models/Users');


router.get("/:bid", async (req, res) => {
    const { bid } = req.params;
    const bottle = await Bottle.findOne({ _id: bid }).populate('reviews');
    const reviews = bottle.reviews;
    res.json({ reviews: reviews });
})
router.post("", async (req, res) => {
    const { uid, description, bid } = req.body;
    const review = new Reviews({
        description: description
    });
    await review.save();
    const account = await Account.findOne({ _id: uid });
    const user = await Users.findOne({ account: account._id })
    user.reviews.push(review);
    await user.save();
    const bottle = await Bottle.findOne({ _id: bid });
    bottle.reviews.push(review);
    await bottle.save();
    res.json({ success: "Created comment" })
})
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Reviews.findByIdAndDelete(id);
    res.json({ success: "Created deleted" })
})


module.exports = router;