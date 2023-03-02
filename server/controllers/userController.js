const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const User = require("../models/userModel");

exports.allUsers = catchAsync(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(201).json({ users });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.find({ name: req.params.name });
  res.status(203).json({ user });
});

exports.addBookmark = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const chatId = req.body.chatId;
  const isPresent = await User.find({
    _id: userId,
    $and: [{ bookmarkChats: { $elemMatch: { $eq: chatId } } }],
  });
  // console.log("------------isPresent--------------");
  // console.log(isPresent);
  // console.log("------------isPresent--------------");
  if (isPresent.length > 0) {
    const bookmark = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { bookmarkChats: chatId },
      },
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: "sucsess",
      user: bookmark,
    });
  }
  const bookmark = await User.findByIdAndUpdate(
    userId,
    {
      $push: { bookmarkChats: chatId },
    },
    {
      new: true,
    }
  ).populate("bookmarkChats", "chatName discription upvotes downvotes");
  return res.status(201).json({
    status: "sucsess",
    user: bookmark,
  });
});
