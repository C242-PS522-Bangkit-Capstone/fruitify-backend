const express = require('express');
const { getAllData, createData, saveFile } = require('../controllers/dataController');
const multer = require('multer')

const router = express.Router();

// Routes to get all fruit's data
router.get('/getAllData', getAllData);

// Routes to create a new fruit's data
router.post('/', createData);

const upload = multer({
  dest: 'uploads/'
})

router.post('/upload', upload.single('file'), saveFile)

module.exports = router;
