const { generarLlave } = require("../../utils/jwt");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const upload = require("../../config/multerConfig");
const multer = require('multer');

//! Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("events", "title location");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: "Error al obtener los usuarios" });
  }
};

//! Obtener un usuario por ID 
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("events", "title location description");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(400).json({ error: "Error al obtener el usuario" });
  }
};

//! Registrar un nuevo usuario
const register = async (req, res) => {
  upload.single('avatar')(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error al subir el archivo" });
    } else if (err) {
      return res.status(500).json({ error: "Error del servidor al subir el archivo" });
    }

    try {
      const { fullName, username, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato de email no válido" });
      }

      const userDuplicated = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (userDuplicated) {
        return res.status(400).json({ error: "El usuario o email ya existe" });
      }

      const newUser = new User({
        fullName,
        username,
        email,
        password,
        avatar: req.file ? req.file.filename : undefined
      });

      const user = await newUser.save();

      user.password = undefined;

      return res.status(201).json({
        message: "Usuario registrado exitosamente",
        user
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return res.status(500).json({ error: "Error al registrar el usuario" });
    }
  });
};


//! Iniciar sesión (Login)
const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    const token = generarLlave(user._id);
    user.password = undefined; // Ocultar la contraseña en la respuesta

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

//! Actualizar Usuario (tienes que estar login)
const updateUser = async (req, res) => {
  upload.single('avatar')(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error al subir el archivo" });
    } else if (err) {
      return res.status(500).json({ error: "Error del servidor al subir el archivo" });
    }

    try {
      const { id } = req.params;

      if (req.user._id.toString() !== id) {
        return res.status(403).json({ error: "No puedes modificar a alguien que no seas tú mismo" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const { username, email, password } = req.body;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Formato de email no válido" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail && existingEmail._id.toString() !== id) {
          return res.status(400).json({ error: "El email ya está en uso por otro usuario" });
        }
        user.email = email;
      }

      if (username) user.username = username;
      if (password) user.password = password; // Será encriptada con el pre-save hook
      if (req.file) user.avatar = req.file.filename;

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  });
};


//! Eliminar usuario (tienes que estar login)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== req.user._id.toString()) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta cuenta" });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    return res.status(500).json({ error: "Error al eliminar la cuenta" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser
};