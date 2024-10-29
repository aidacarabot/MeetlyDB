require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRouter = require("./src/api/routes/userRoute");
const eventRouter = require("./src/api/routes/eventRoute");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON

app.use("/api/v1/users",userRouter); //ruta usuarios
app.use("/api/v1/events", eventRouter); //ruta eventos

app.use("*", (req, res, next) => {
  return res.status(404).json("Route Not Found");
})

app.listen (3000, () => {
  console.log("http://localhost:3000");
})