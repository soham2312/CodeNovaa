const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const adminController = require("./../controllers/adminController");

const router = express.Router();

router
  .route("/delete-discussion")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.deleteDiscussion
  );

router
  .route("/all-chats")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.allChats
  );

module.exports = router;