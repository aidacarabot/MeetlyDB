const { generarLlave } = require("../../utils/jwt"); // Importa la función para generar tokens JWT.
const User = require("../models/userModel"); // Importa el modelo de usuario.
const bcrypt = require("bcryptjs"); // Biblioteca para manejar el hash de contraseñas.

//! Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    // Busca todos los usuarios y llena los datos de los eventos relacionados con "title" y "location".
    const users = await User.find().populate("events", "title location");
    return res.status(200).json(users); // Responde con el listado de usuarios.
  } catch (error) {
    return res.status(400).json({ error: "Error al obtener los usuarios" }); // Error en la consulta.
  }
};

//! Obtener un usuario por ID 
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID del parámetro de la solicitud.
    // Busca un usuario por ID y llena los datos de los eventos relacionados.
    const user = await User.findById(id).populate("events", "title location description");

    if (!user) {
      // Si el usuario no existe, responde con un error 404.
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user); // Responde con el usuario encontrado.
  } catch (error) {
    console.error("Error al obtener el usuario:", error); // Log para debugging.
    return res.status(400).json({ error: "Error al obtener el usuario" }); // Error en la consulta.
  }
};

//! Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword } = req.body; // Datos del cuerpo de la solicitud.

    if (password !== confirmPassword) {
      // Valida que las contraseñas coincidan.
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    // Valida el formato del email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Formato de email no válido" });
    }

    // Verifica si el username o email ya existen en la base de datos.
    const userDuplicated = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userDuplicated) {
      // Responde con error si el usuario o email ya existen.
      return res.status(400).json({ error: "El usuario o email ya existe" });
    }

    // Crea un nuevo usuario con los datos proporcionados.
    const newUser = new User({
      fullName,
      username,
      email,
      password, // El hash de la contraseña será manejado por un hook pre-save.
    });

    const user = await newUser.save(); // Guarda el usuario en la base de datos.

    user.password = undefined; // Oculta la contraseña antes de enviarla al cliente.

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user, // Devuelve el usuario registrado.
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); // Log para debugging.
    return res.status(500).json({ error: "Error al registrar el usuario" }); // Error en el servidor.
  }
};

//! Iniciar sesión (Login)
const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body; // Extrae credenciales del cuerpo de la solicitud.

    // Busca al usuario por username o email.
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      // Responde con error si el usuario no existe.
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Verifica que la contraseña sea válida.
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Genera un token JWT para el usuario.
    const token = generarLlave(user._id);
    user.password = undefined; // Oculta la contraseña en la respuesta.

    return res.status(200).json({ token, user }); // Devuelve el token y los datos del usuario.
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Log para debugging.
    return res.status(500).json({ error: "Error al iniciar sesión" }); // Error en el servidor.
  }
};

//! Actualizar Usuario (tienes que estar login)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID del parámetro de la solicitud.

    // Verifica que el usuario autenticado sea el propietario de la cuenta.
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: "No puedes modificar a alguien que no seas tú mismo" });
    }

    const user = await User.findById(id); // Busca al usuario por ID.
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" }); // Responde con error si no se encuentra.
    }

    const { username, email, password } = req.body; // Datos del cuerpo de la solicitud.

    if (email) {
      // Valida el formato del email.
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato de email no válido" });
      }

      // Verifica que el email no esté en uso por otro usuario.
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== id) {
        return res.status(400).json({ error: "El email ya está en uso por otro usuario" });
      }
      user.email = email; // Actualiza el email si pasa las validaciones.
    }

    if (username) user.username = username; // Actualiza el nombre de usuario si está presente.
    if (password) user.password = password; // La contraseña será encriptada en un hook.

    const updatedUser = await user.save(); // Guarda los cambios en la base de datos.
    updatedUser.password = undefined; // Oculta la contraseña en la respuesta.

    return res.status(200).json(updatedUser); // Devuelve el usuario actualizado.
  } catch (error) {
    console.error("Error al actualizar el usuario:", error); // Log para debugging.
    return res.status(500).json({ error: "Error al actualizar el usuario" }); // Error en el servidor.
  }
};

//! Eliminar usuario (tienes que estar login)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID del parámetro de la solicitud.

    // Verifica que el usuario autenticado sea el propietario de la cuenta.
    if (id !== req.user._id.toString()) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta cuenta" });
    }

    await User.findByIdAndDelete(id); // Elimina el usuario de la base de datos.
    return res.status(200).json({ message: "Cuenta eliminada correctamente" }); // Responde con éxito.
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error); // Log para debugging.
    return res.status(500).json({ error: "Error al eliminar la cuenta" }); // Error en el servidor.
  }
};

// Exporta todas las funciones para ser usadas en rutas u otros módulos.
module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser,
};