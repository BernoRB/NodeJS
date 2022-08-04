const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        filesize: 10_000_000
    }
})

module.exports = { imageUpload }