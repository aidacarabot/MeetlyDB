const express = require("express");
const { isAuth } = require("../../middlewares/auth");
const { getEvents, createEvent, addAttendance, removeAttendance, getAttendingEvents, deleteEvent, getAttendees } = require("../controllers/eventController");
const { upload } = require("../../middlewares/file");

const eventRouter = express.Router();

eventRouter.get("/", getEvents); // Get all events (public)
eventRouter.post("/", isAuth, upload.single("img"), createEvent); // Create a new event (authenticated) with an uploaded image
eventRouter.post("/attend/:eventId", isAuth, addAttendance); // to add yourself to an event (logged in)
eventRouter.delete("/attend/:eventId", isAuth, removeAttendance); //to remove yourself from an event (logged in)
eventRouter.get("/attend", isAuth, getAttendingEvents); // Get all events the logged-in user is attending (authenticated)
eventRouter.delete("/:eventId", isAuth, deleteEvent); // Delete an event (only by the organizer) (authenticated)
eventRouter.get("/:eventId/attendees", isAuth, getAttendees); // Get attendees of a specific event (only by the organizer) (authenticated)

module.exports = eventRouter;