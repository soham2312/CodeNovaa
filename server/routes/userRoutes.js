const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/:name").get(userController.getUser);
router.route("/").get(userController.allUsers);
router
  .route("/add-bookmark")
  .post(authController.protect, userController.addBookmark);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
