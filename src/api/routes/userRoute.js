const { isAuth } = require("../../middlewares/auth");
const { getUsers, getUserById, register, login, updateUser, deleteUser } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", getUsers); // Get all users (public)
userRouter.get("/:id", getUserById); // Get a specific user by ID (authenticated)
userRouter.post("/register", register); // Register a new user (public)
userRouter.post("/login", login); // Login user (public)
userRouter.put("/update/:id", isAuth, updateUser); // Update logged-in user's profile (authenticated)
userRouter.delete("/delete/:id", isAuth, deleteUser); // Delete logged-in user's account (authenticated)

module.exports = userRouter;