const { cloudinary } = require("../config/cloudinary");

const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited.at(-1).split(".")[0];
  const folderSplited = imgSplited.at(-2);
  const public_id = `${folderSplited}/${nameSplited}`;

  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error("Error al eliminar la imagen en Cloudinary:", error);
    } else {
      console.log("Imagen eliminada en Cloudinary:", result);
    }
  });
};

module.exports = { deleteImgCloudinary };