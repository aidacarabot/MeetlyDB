const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Conectado exitosamente a Cloudinary");
  } catch (error) {
    console.error("Error al conectar con Cloudinary:", error);
  }
};

module.exports = { cloudinary, connectCloudinary };