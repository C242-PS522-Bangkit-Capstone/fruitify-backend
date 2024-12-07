const db = require('../db');
const {uploadFileToCloudStorage, addHistoryToDb} = require('../cloud/storage/util')

// Get all fruit data
exports.getAllData = (req, res) => {
  const query = 'SELECT * FROM data';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ 
        error: true,
        message: 'Error retrieving data'
       });
    }
    return res.status(200).send({
      error: false,
      message: 'Successfully retrieved data',
      data: results
    });
  });
};

exports.saveFile = async (req, res) => {
  const { user_id, fruit_name, fruit_condition, fruit_weight, nutrition_info } = req.body
  const file = req.file


  const upload = await uploadFileToCloudStorage (file, process.env.BUCKET_NAME)
  if(upload.sucess){
    const result = addHistoryToDb(db, [user_id, fruit_name, upload.imgUrl, fruit_condition, fruit_weight, nutrition_info])
    if(result.sucess){
      console.log('Data : ', result.data)
      return res.status(200).send({
        error: false,
        message: 'Data inserted successfully'
      })
    }else{
      return res.status(500).send({
        error: true,
        message: 'Terjadi kesalahan'
      })
    }
  }else{
    return res.status(500).send({
      error: true,
      message: 'Terjadi kesalahan'
    })
  }
  
}


// Create new fruit data
exports.createData = (req, res) => {
  const { user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info } = req.body;
  const query = 'INSERT INTO data (user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error inserting data' });
    }
    res.status(201).send({ message: 'Data inserted successfully', data: results });
  });
};
