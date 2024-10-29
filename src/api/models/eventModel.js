const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
    collection: "events"
  }
);

const Evento = mongoose.model("events", eventSchema, "events");

module.exports = Evento;