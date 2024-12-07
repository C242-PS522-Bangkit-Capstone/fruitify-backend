const express = require('express');
const authRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes');
const { getAllData, createData, saveFile } = require('../controllers/dataController');
const multer = require('multer')


const router = express.Router();

// Use routes for authentication
router.use('/auth', authRoutes);

// Use routes for fruit data
router.use('/data', dataRoutes);

// Routes to get all fruit's data
router.get('/getAllData', getAllData);

// Routes to create a new fruit's data
router.post('/', createData);

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
   
    cb(null, 'D:\\Jeremia Sibarani\\jnhelp\\frutify_backend\\uploads')
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
})


const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), saveFile)

module.exports = router;
