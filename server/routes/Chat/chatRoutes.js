const express = require("express");
const chatController = require("./../../controllers/Chat/chatController");
const authController = require("./../../controllers/authController");

const router = express.Router();

router.route("/").post(authController.protect, chatController.acessChat);
router.route("/").get(authController.protect, chatController.fetchChats);
router
  .route("/create-discussion")
  .post(authController.protect, chatController.createGroupChat);

router
  .route("/discussion")
  .get(authController.protect, chatController.getAllDiscussion);

router.route("/vote/:id").post(authController.protect, chatController.doVotes);

module.exports = router;
