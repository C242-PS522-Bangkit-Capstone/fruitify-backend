const storage = require('../storage/storage')

exports.uploadFileToCloudStorage = async (file, bucketName) => {
  const gcs = storage.bucket(`gs://${bucketName}`)
  const originalFileName = file.originalname
  const storagePath = `history/${originalFileName}`
  const filePath = file.path
  try {
    const result = await gcs.upload(filePath, {
      destination: storagePath,
      public: true,
      metadata: {
        contentType: 'image/jpg'
      }
    })
    const baseUrl = result[0].storage.apiEndpoint
    const bucketName = result[0].bucket.name
    const _fileName = result[0].metadata.name
    const imgUrl = `${baseUrl}/${bucketName}/${_fileName}`
    return {
      sucess: true,
      imgUrl: imgUrl
    }
  } catch (error) {
    console.log('Error : ', error)
    return {
      sucess: false,
      imgUrl: ''
    }
  }
}

exports.addHistoryToDb = (db, data) => {
  const query = 'INSERT INTO data(user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info) VALUES (?, ?, ?, ?, ?, ?)'
  try {
    let result = []
    db.query(query, data, (err, res) => {
      if(err){
        throw err 
      }else{
        result = res
      }
    })
    return {
      sucess: true,
      data: result
    }
  } catch (error) {
    console.log('Error db : ', error)
    return {
      sucess: false,
      data: null
    }
  }
}
