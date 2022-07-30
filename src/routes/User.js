const router = require("express").Router();
const User = require("../controllers/UserController");
const middlewares = require("../middlewares");

router.put("/:id", middlewares.isAuthorised, User.updateUserDetails);
router.delete("/:id", middlewares.isAdmin, User.deleteUser);
router.get("/find/:id", middlewares.isAdmin, User.getUser);
router.get(
  "/",
  middlewares.isAuthorised,
  middlewares.isAdmin,
  User.getAllUsers
);
router.get(
  "/stats",
  middlewares.isAuthorised,
  middlewares.isAdmin,
  User.getUserStats
);

module.exports = router;
