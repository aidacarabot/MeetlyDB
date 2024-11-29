const express = require("express");
const { isAuth } = require("../../middlewares/auth");
const { 
  getEvents, 
  createEvent, 
  addAttendance, 
  removeAttendance, 
  getAttendingEvents, 
  deleteEvent, 
  getAttendees, 
  getMyCreatedEvents 
} = require("../controllers/eventController");
const { upload } = require("../../middlewares/file");

// Creamos el router usando express.Router()
const eventRouter = express.Router();

// Rutas del evento
eventRouter.get("/", getEvents); // Obtener todos los eventos (público)
eventRouter.post("/", isAuth, upload.single("img"), createEvent); // Crear un nuevo evento (autenticado) con una imagen
eventRouter.post("/attend/:eventId", isAuth, addAttendance); // Registrarse a un evento (autenticado)
eventRouter.delete("/attend/:eventId", isAuth, removeAttendance); // Cancelar asistencia a un evento (autenticado)
eventRouter.get("/attend", isAuth, getAttendingEvents); // Obtener los eventos a los que asiste el usuario autenticado
eventRouter.delete("/:eventId", isAuth, deleteEvent); // Eliminar un evento (solo el organizador)
eventRouter.get("/:eventId/attendees", isAuth, getAttendees); // Obtener los asistentes de un evento (solo el organizador)
eventRouter.get("/created", isAuth, getMyCreatedEvents); // Obtener eventos creados por el usuario autenticado

// Exportamos el router
module.exports = eventRouter;