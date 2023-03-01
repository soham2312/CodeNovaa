const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Report = require("../models/reportModel");
const Chat = require("./../models/Chat/chatModel");
const Message = require("./../models/Chat/messageModel");

exports.reportDiscussion = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;
  const newReport = await Report.create({
    sender: req.user._id,
    content: content,
    chatId: chatId,
  });

  //   console.log(newReport);
  res.status(201).json({
    status: "success",
    report: newReport,
  });
});
