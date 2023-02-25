const mongoose = require("mongoose");
const AppError = require("./../../utils/appError");
const catchAsync = require("./../../utils/catchAsync");
const Chat = require("./../../models/Chat/chatModel");
const User = require("./../../models/userModel");

exports.acessChat = catchAsync(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      // return next(new AppError("Invalid email or password", 401));
      return next(new AppError(error.message, 401));
    }
  }
});

exports.fetchChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    }).populate("users", "-password");
    res.send(chat);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};

exports.createGroupChat = catchAsync(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill the field" });
  }
  var users = JSON.parse(req.body.users);
  if (users.lenght < 2) {
    return res
      .status(400)
      .send("more than 2 users are required for a group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
});
