const jwt = require("jsonwebtoken");

// Generar un token JWT con el ID del usuario
const generarLlave = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1y" });
};

// Verificar el token JWT y extraer el ID del usuario
const verificarLlave = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generarLlave, verificarLlave };