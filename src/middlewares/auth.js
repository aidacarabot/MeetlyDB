const User = require("../api/models/userModel");
const { verificarLlave } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    const parsedToken = token.replace("Bearer ", ""); // Elimina "Bearer " del token
    const { id } = verificarLlave(parsedToken); // Extrae el ID del token

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = { _id: user._id.toString() }; // Guarda el ID del usuario autenticado en la request
    next(); // Continúa con el siguiente middleware o controlador
  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(401).json({ error: "No estás autorizado" });
  }
};

module.exports = { isAuth };