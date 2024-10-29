const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "events" }],
    rol: { type: String, required: true, default: "user", enum: [ "admin", "user" ],},
  },
  {
    timestamps: true,
    collection: "users"
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Evita hashear si la contraseña no cambió
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User
