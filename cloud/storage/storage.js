const { Storage } = require('@google-cloud/storage')
require('dotenv').config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: 'cloud/storage/service-account.json'
})

module.exports = storage;