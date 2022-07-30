const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const middlewares = require("../middlewares");

router.post("/register", AuthController.signUp);
router.post("/login", AuthController.login);

module.exports = router;
