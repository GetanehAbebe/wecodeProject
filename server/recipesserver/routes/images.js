const express = require("express");
const router = express.Router();
const api = require('../DAL/api')
const path = require('path')
const multer = require("multer")




const filesStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/')
    },
    filename: (req, file, cb) => {
        console.log('11', file)
        cb(err => {
            console.log(err);

        }, file, Date.now() + path.extname(file.orginalname))
    }
})

const upload = multer({
    storage: filesStorageEngine
})
const { getRecipeImages, getDataFromApi } = require('../DAL/api')

const getAllImages = async (req, res) => {
    try {
        const response = await getDataFromApi('images')
        res.status(200).json(response)
    } catch (err) {
        res.status(404).send('not found')
    }
}


const recipeImages = async (req, res) => {
    try {
        console.log(req.params.recipeId);

        const response = await getRecipeImages(req.params.recipeId)
        console.log(response);

        res.status(200).json(response)
    } catch (err) {
        res.status(404).send('not found')
    }
};


router.post('/', upload.single("image"), (req, res) => {

    console.log('fs file', req.file);

    res.send(req.file)
})
router.post('/mult', upload.array("images", 6), (req, res) => {
    console.log('3', req.files);

    res.send(req.files)

})

router.route("/").get(getAllImages)

router
    .route("/:recipeId").get(recipeImages)

module.exports = router;