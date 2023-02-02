const express = require('express');
const router = express.Router();
const Website = require('../models/Website');

router.get("", async (req, res) => {
    const webpage = await Website.findOne({});
    res.json({ website: webpage });
})

router.put("", async (req, res) => {
    const webpage=await Website.updateOne({_id:"63b26af898de27ad5c79d4f2"},{aboutUs:req.body.aboutUs,image:req.body.image});
    res.json({success:"updated about us"})
})


module.exports = router;