const express = require("express");
const router = express.Router();
const db = require('../models/index')
const Unit = db.measuringunits


const getAllunits = async (req, res) => {
    try {
        const response = await Unit.findAll()
        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}
router.route("/").get(getAllunits)


module.exports = router;