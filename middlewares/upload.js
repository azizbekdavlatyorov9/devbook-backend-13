const multer = require("multer")
const path = require("path")

// Upload files
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${file.fieldname}-${Date.now()}`
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${ext}`)
  }
})
const upload = multer({storage})



module.exports = upload