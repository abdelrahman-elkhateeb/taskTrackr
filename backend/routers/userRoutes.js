const express = require("express");
const {
  register,
  login,
  updateUser,
  getUser,
} = require("../controllers/userController.js");

const router = express.Router();

// Sign up route
router.post("/register", register);

// Sign in route
router.post("/login", login);

// Update user route
router.put("/:userId", updateUser).get("/:userId", getUser);

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

// GET all users
router.get("/", (req, res) => {
  res.json(users); // Return the user data
});

module.exports = router;
