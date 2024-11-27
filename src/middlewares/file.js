const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "MeetlyEvents", // Carpeta en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"], // Formatos permitidos
  },
});

const upload = multer({ storage });

module.exports = { upload };