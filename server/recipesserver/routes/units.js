const express = require("express");
const router = express.Router();
const { getDataFromApi } = require('../DAL/api')
const Unit = require('../Images/MeasuringUnit')



const getAllunits = async (req, res) => {
    try {
        const response = await Unit.findAll()
        console.log(response);

        res.send(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}


router.route("/").get(getAllunits)


module.exports = router;