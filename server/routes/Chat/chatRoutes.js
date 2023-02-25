const express = require("express");
const chatController = require("./../../controllers/Chat/chatController");
const authController = require("./../../controllers/authController");

const router = express.Router();

router.route("/").post(authController.protect, chatController.acessChat);
router.route("/").get(authController.protect, chatController.fetchChats);
router
  .route("/group")
  .post(authController.protect, chatController.createGroupChat);

module.exports = router;
